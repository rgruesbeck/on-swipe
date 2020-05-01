// on-swipe

// beacon node, sensitivity in moves, touches, event options
let beacon;
let moves;
let touches = [];
let eventOps = {};

// distance
const distance = (a, b) => {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
}

// velocity
const velocity = (d, t) => {
    return d / t;
}

// take touch list return a diffs for x and y
const touchDiffs = (touchList) => {
    return touchList
        .map((touch, idx, arr) => {
            // collect diffs
            let prev = arr[idx - 1] || arr[0];
            return {
                x: touch.x,
                y: touch.y,
                t: touch.t,
                dx: touch.x - prev.x,
                dy: touch.y - prev.y,
                dt: touch.t - prev.t,
            }
        })
        .reduce((sum, diff) => {
            // sum diffs
            sum.dx += diff.dx;
            sum.dy += diff.dy;
            sum.dt += diff.dt;

            return sum;
        }, { dx: 0, dy: 0, dt: 0 });
}

// take diffs, return a swipe with a direction
const parseDiff = (diff) => {
    return [diff]
        .map(diff => {
            return {
                x: Math.abs(diff.dx) > Math.abs(diff.dy),
                y: Math.abs(diff.dy) > Math.abs(diff.dx),
                dx: diff.dx,
                dy: diff.dy,
                dt: diff.dt
            };
        })
        .map(swipe => {
            // get swipe direction
            if (swipe.x) {
                swipe.direction = swipe.dx > 0 ?
                    'right' : 'left';
            }

            if (swipe.y) {
                swipe.direction = swipe.dy > 0 ?
                    'down' : 'up';
            }

            return {
                dx: swipe.dx,
                dy: swipe.dy,
                velocity: velocity(distance(swipe.dx, swipe.dy), swipe.dt),
                distance: distance(swipe.dx, swipe.dy),
                duration: swipe.dt,
                direction: swipe.direction
            };
        })
        .reduce(s => s);
}

const getSwipe = (type, touch, length, fn) => {
    // reject non touch types
    if (!type.match(/touchstart|touchmove|touchend/)) {
        return;
    }

    // clear touch list
    if (type === 'touchstart') {
        touches = [];
    }

    // add to touch list
    if (type === 'touchmove') {
        let { clientX, clientY } = touch;
        touches.push({
            x: clientX,
            y: clientY,
            t: Date.now()
        });
    }

    // get user intention
    if (type === 'touchend' && touches.length > length) {

        // convert: touches -> diffs -> swipe
        const swipe = [touches]
            .map(touches => touchDiffs(touches))
            .map(diff => parseDiff(diff))
            .reduce(s => s);

        fn(swipe);
    }
}

// broadcast swipe event
const broadcastSwipe = (type, touch) => {
    // get swipe and boardcast
    getSwipe(type, touch, moves, (swipe) => {
        let detail = { detail: swipe };

        beacon.dispatchEvent(new CustomEvent('swipe', {
            ...detail,
            ...eventOps
        }))
    });
}

// todo: refactor to use decorator
const onSwipe = (ops) => {
    // swipe options
    beacon = ops.node || document;
    moves = ops.sensitivity || 5;

    // event options
    eventOps = {
        bubbles: ops.bubbles === false ? false : true,
        cancelable: ops.cancelable === false ? false : true
    }

    // add listeners
    beacon.addEventListener('touchstart', ({ touches }) => broadcastSwipe('touchstart', touches[0]));
    beacon.addEventListener('touchmove', ({ touches }) => broadcastSwipe('touchmove', touches[0]));
    beacon.addEventListener('touchend', ({ touches }) => broadcastSwipe('touchend', touches[0]));

}

export default onSwipe;