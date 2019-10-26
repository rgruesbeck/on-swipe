# on-swipe
Adds a swipe event do the DOM that reports direction, velocity, distance, and duration.

## tldr;
```js
import onSwipe from 'on-swipe';

// register swipe event emitter
onSwipe();

// listen for swipe event
document.addEventListener('swipe', (event) => {

    // use swipe
    console.log(event.detail);
})
```

## Install
```sh
npm install --save on-swipe
```

## Use
Call `onSwipe()` once after your app loads.

### Syntax
```js 
onSwipe({options})
```
* `options` is an object with the following optional properties:
  + `node: document` DOM node you want to broadcast the swipe event from.
  + `sensitivity: 5` number of touch moves before emitting a swipe event.
  + `bubbles: true` if the event should bubble.
  + `cancelable: true` if the `event.preventDefault()` should work.

### Returns
The swipe events `event.detail` attribute contains the following properties:

| Variable | Type | Description |
|----------|------|-------------|
| `direction`   | `string` | The direction of the swipe in [left, right, up, down]|
| `velocity` | `float` | velocity of swipe in pixels/millisecond |
| `distance` | `float` | distance of swipe in pixels |
| `duration` | `int` | duration of swipe in milliseconds |
| `dx` | `float` | distance of swipe x direction |
| `dy` | `float` | distance of swipe y direction |

### Examples
#### Default

```js
import onSwipe from 'on-swipe';

// register swipe event emitter
onSwipe();

// listen for swipe event
document.addEventListener('swipe', (event) => {

    // use swipe
    let { direction, velocity, distance, duration } = event.detail;
})
```

#### Options

```js
import onSwipe from 'on-swipe';

// register swipe event emitter
onSwipe({ node: window, sensitivity: 10 });

// listen for swipe event
window.addEventListener('swipe', (event) => {

    // use swipe
    let { direction, velocity, distance, duration } = event.detail;
})
```
