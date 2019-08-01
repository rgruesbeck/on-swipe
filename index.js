// list touches
let touches = [];

// take touch list return a diffs for x and y
const touchDiffs = (touchList) => {
    return touchList
    .map((touch, idx, arr) => {
        // collect diffs
        let prev = arr[idx - 1] || arr[0];
        return {
            x: touch.x,
            y: touch.y,
            dx: touch.x - prev.x,
            dy: touch.y - prev.y
        }
    })
    .reduce((sum, diff) => {
        // sum the diffs
        sum.dx += diff.dx;
        sum.dy += diff.dy;

        return sum;
    }, { dx: 0, dy: 0 });
}

// take diffs, return a swipe with a direction
const parseDiff = (diff) => {
    return [diff]
    .map(diff => {
        return {
            x: Math.abs(diff.dx) > Math.abs(diff.dy),
            y: Math.abs(diff.dy) > Math.abs(diff.dx),
            dx: diff.dx,
            dy: diff.dy
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
        touches.push({ x: clientX, y: clientY });
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

// handle swipe
const handleSwipe = (type, touch) => {

    // get a swipe after 5 touch moves
    getSwipe(type, touch, 5, (swipe) => {

        document.dispatchEvent(new CustomEvent('swipe', {
            detail: swipe,
            swipe: swipe
        }))
    });
}

const onSwipe = (node) => {

    // add listeners
    node.addEventListener('touchstart', ({ touches }) => handleSwipe('touchstart', touches[0]));
    node.addEventListener('touchmove', ({ touches }) => handleSwipe('touchmove', touches[0]));
    node.addEventListener('touchend', ({ touches }) => handleSwipe('touchend', touches[0]));



}


export default getSwipe;