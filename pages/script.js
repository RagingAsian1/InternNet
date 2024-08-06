// DOM Elements
const body = document.body; // Body
const elements = [...body.children[0].children]; // Page Elements
const items = document.querySelectorAll('.item'); // All Items (Cards)
const windowCenterX = window.innerWidth / 2; // Center of WindowX
const windowCenterY = window.innerHeight / 2; // Center of WindowY
const documentTitle = document.title; // Document Title
const categoryTags = document.querySelectorAll('.category'); // Category Tag
const barTags = document.querySelectorAll('.bar'); // Bar Tag

easeIn();
changeBackground();
// Animation
items.forEach(item => { // For Each Item (Card)
    item.addEventListener('click', () => { // Listen for Click
        const innerHTML = item.innerHTML; // Inner HTML Before Changes
        document.body.style.overflow = 'hidden'; // Disables Scrolling
        item.classList.add('active'); // Designate Item As Active
        item.style.pointerEvents = 'none'; // Disable Clicking
        blur();
        moveToCenter(item, innerHTML);
    });
});
returnToHome();