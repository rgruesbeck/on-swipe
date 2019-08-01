import onSwipe from './index.js';

console.log('hello')

// handle swipes
document.addEventListener('touchstart', ({ touches }) => handleSwipe('touchstart', touches[0]));
document.addEventListener('touchmove', ({ touches }) => handleSwipe('touchmove', touches[0]));
document.addEventListener('touchend', ({ touches }) => handleSwipe('touchend', touches[0]));

document.addEventListener('swipe', (swipe) => {
    console.log(swipe);
})

// handle swipe
const handleSwipe = (type, touch) => {
    // get a swipe after 5 touch moves
    onSwipe(type, touch, 5, (swipe) => {

        // console.log(swipe);
        document.dispatchEvent(new CustomEvent('swipe', {
            detail: swipe,
            swipe: swipe
        }))
    });
}