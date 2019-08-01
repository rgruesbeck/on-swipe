import onSwipe from './index.js';

onSwipe({ node: window, sensitivity: 5 });

window.addEventListener('swipe', (event) => {
    console.log(event.detail);
})