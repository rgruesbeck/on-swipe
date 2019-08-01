import onSwipe from './index.js';

onSwipe({ node: document.body, sensitivity: 5 });

window.addEventListener('swipe', (event) => {
    console.log(event.detail);
})