# on-swipe
Add a swipe event that returns direction and speed.

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
  + `node` DOM node you want to broadcast the swipe event from. (defaults to `document`)
  + `sensitivity` number of touch moves before emitting a swipe event. (defaults to `5`)

### Returns
The swipe events `event.detail` attribute contains the following properties:
| Variable | Type | Description |
|----------|------|-------------|
| `direction`   | `string` | The direction of the swipe in [left, right, up, down]|
| `v` | `float` | velocity of swipe in pixels/millisecond |
| `dx` | `float` | distance of swipe x direction |
| `dy` | `float` | distance of swipe y direction |
| `dt` | `int` | duration of swipe in milliseconds |

### Examples

```js
import onSwipe from 'on-swipe';

// register swipe event emmiter
onSwipe();

// listen for swipe event
document.addEventListener('swipe', (event) => {
    console.log(event.detail);
})
```