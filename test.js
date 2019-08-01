import onSwipe from './index.js';

onSwipe(document, 5);

document.addEventListener('swipe', (event) => {
    console.log(event.detail);
})