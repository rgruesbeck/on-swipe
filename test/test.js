import onSwipe from './index.js';

onSwipe({ node: document, sensitivity: 5 });

document.addEventListener('swipe', (event) => {
    let swipe = document.createElement('p');
    swipe.innerText = JSON.stringify(event.detail);

    document.body.appendChild(swipe);

    console.log(event.detail);
})