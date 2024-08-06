// DOM Elements
const body = document.body; // Body
const items = document.querySelectorAll('li'); // All Items (Cards)

items.forEach(item => { // For Each Item (Card)
    item.addEventListener('click', (event) => { // Listen for Click
        event.preventDefault(); // Prevent Being Redirected 
        gsap.to(body, { duration: 0.5, opacity: 0 }); // Fade Out
        setTimeout(() => { window.location.href = event.target.href }, 400); // Redirect After 0.4s
    });
});

window.addEventListener('load', () => { // When Page Loads
    gsap.fromTo(body, { opacity: 0 }, { duration: 1.5, opacity: 1 }); // Fade In
});