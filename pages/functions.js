function blur() { // Blurs All Elements Except Active Element
    elements.forEach(element => {
        if (!element.classList.contains('active')) {
            gsap.to(element, { opacity: 0 });
            element.style.pointerEvents = 'none'; // Disable Clicking of Other Items (Cards)
        }
    });
}

function unblur() { // Unblurs All Elements
    elements.forEach(element => {
        gsap.to(element, { duration: 0.5, opacity: 1 });
        element.style.pointerEvents = 'auto'; // Enables Clicking of Other Items (Cards)
    });
}

function distanceToCenter(item) { // Gets Distance To Center
    const itemRect = item.getBoundingClientRect();
    const itemCenter = itemRect.top + itemRect.height / 2;
    return windowCenterY - itemCenter;
}

function moveToCenter(item, innerHTML) { // Moves Item (Card) To Center
    const distance = distanceToCenter(item) - 195;
    gsap.to(item, {
        duration: 0.75, 
        ease: 'power1.inOut',
        y: distance,
        onComplete: () => { // When MoveToCenter Is Done
            changeContent(item);
            addBackButton(item, innerHTML);
        },
    });
}

function revert(item, innerHTML) { // Reverts Item (Card) From Center Back To Original Position
    const distance = distanceToCenter(item);
    gsap.to(item, {
        duration: 0.75,
        ease: 'power1.inOut',
        y: -distance,
        onComplete: () => { // When Revert Is Done
            unchangeContent(item, innerHTML);
            unblur();
            document.body.style.overflow = 'auto'; // Enables Scrolling
        }
    });
}

function addBackButton(item, innerHTML) { // Adds Back Button and Listens For Click
    const backButton = document.createElement('div');
    backButton.innerHTML = `&#x274c;`;
    backButton.classList.add('backButton');
    item.appendChild(backButton);
    backButton.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents Item (Card) From Being Clicked Again
        item.classList.remove('active'); // Remove Active State From Item (Card)
        item.style.pointerEvents = 'auto'; // Enable Clicking
        item.removeChild(backButton); // Remove Back Button
        revert(item, innerHTML);
    });
}

function changeContent(item) { // Changes Item (Card) Content
    while (item.children.length > 1) // Removes All Children Except the Title
        item.removeChild(item.lastChild);

    const priceTag = document.createElement('div'); // Create Price Tag
    const deadlineTag = document.createElement('div'); // Create Deadline Tag
    const descriptionTag = document.createElement('p'); // Create Description Tag
    const linkTag = document.createElement('a'); // Create Link Tag

    const title = item.children[0].innerText; // Store Title of Item (Card)
    fetch('data.json').then(res => res.json()).then(data => { // Get JSON Data
        const item = data.find(item => title.includes(item.name)); // Find Item (Card) in JSON Data
        priceTag.innerText = `${item.price}`; // Set Price
        deadlineTag.innerText = `${item.duration}`; // Set Deadline
        descriptionTag.innerText = item.description; // Set Description
        linkTag.href = item.link.url; // Set Link HREF
        linkTag.innerText = item.link.innerHTML; // Set Link InnerHTML
    });
    linkTag.target = `_blank`; // Open Link In New Tab

    const categoryBackground = categoryBackgrounds[documentTitle];
    const linkTagTextColor = linkTagTextColors[documentTitle];
    priceTag.classList.add('priceTag'); // Add Class to Price Tag
    priceTag.style.background = categoryBackground; // Set Background Color of Price Tag
    deadlineTag.classList.add('deadlineTag'); // Add Class to Deadline Tag
    deadlineTag.style.background = categoryBackground; // Set Background Color of Deadline Tag
    descriptionTag.classList.add('descriptionTag'); // Add Class to Description Tag
    linkTag.classList.add('linkTag'); // Add Class to Link Tag
    linkTag.style.background = categoryBackground; // Set Background Color of Link Tag
    linkTag.style.color = linkTagTextColor;

    item.appendChild(priceTag); // Add Price Tag to Item (Card)
    item.appendChild(deadlineTag); // Add Deadline Tag to Item (Card)
    item.appendChild(descriptionTag); // Add Description Tag to Item (Card)
    item.appendChild(linkTag); // Add Link Tag to Item (Card)
    linkTag.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents Item (Card) From Being Clicked Again
    });
    item.style.height = '550px'; // Set New Height
}

function unchangeContent(item, innerHTML) { // Reverts Item (Card) Content Back To Original
    item.removeChild(item.querySelector('.priceTag')); // Remove Price Tag
    item.removeChild(item.querySelector('.deadlineTag')); // Remove Deadline Tag
    item.removeChild(item.querySelector('.descriptionTag')); // Remove Description Tag
    item.removeChild(item.querySelector('.linkTag')); // Remove Link Tag
    item.innerHTML = innerHTML; // Revert InnerHTML to Original HTML
    item.style.height = '160px'; // Set Original Height
    item.style = 'scale(0.95)'; // Set Original Scale
}

function easeIn() { // Ease In When Page Loads
    window.addEventListener('load', () => { // When Page Loads
        gsap.fromTo(body, { opacity: 0 }, { duration: 1.5, opacity: 1 }); // Fade In
    });
}


const backgrounds = { // Map of Backgrounds
    'STEM': 'linear-gradient(to right, rgb(185, 226, 255), rgb(248, 249, 233))', // STEM Page
    'Health & Medicine': 'linear-gradient(to right, rgb(162, 141, 255), rgb(224, 216, 255))', // Health & Medicine Page
    'Business & Economics': 'linear-gradient(to right, rgb(255, 168, 168), rgb(255, 255, 255))', // Business & Economics Page
    'Law': 'linear-gradient(to right, rgb(215, 199, 146), rgb(255, 255, 255))', // Law Page
    'Arts & Humanities': 'linear-gradient(to right, rgb(131, 154, 255), rgb(255, 255, 255))', // Arts & Humanities Page
    'Social Science': 'linear-gradient(to right, rgb(150, 150, 150), rgb(255, 255, 255))', // Social Science Page
    'Communications & Media': 'linear-gradient(to right, rgb(255, 224, 163), rgb(255, 255, 255))', // Communications & Media Page
    'Service': 'linear-gradient(to right, rgb(171, 255, 150), rgb(255, 255, 255))', // Service Page
    'Research': 'linear-gradient(to right, rgba(229, 150, 255, 0.881), rgb(255, 255, 255))', // Research Page
    'Leadership': 'linear-gradient(to right, rgb(227, 255, 170), rgb(255, 255, 255))', // Leadership Page
    'Vocational & Technical Studies': 'linear-gradient(to right, rgb(94, 74, 30), rgb(232, 210, 121))', // Vocational & Technical Studies Page
};
const categoryBackgrounds = { // Map of Category Backgrounds
    'STEM': 'rgb(179, 179, 255)', // STEM Page
    'Health & Medicine': 'rgb(200, 141, 208)', // Health & Medicine Page
    'Business & Economics': 'rgb(243, 140, 140)', // Business & Economics Page
    'Law': 'rgb(235, 228, 134)', // Law Page
    'Arts & Humanities': 'rgb(178, 178, 255)', // Arts & Humanities Page
    'Social Science': 'rgb(194, 195, 197)', // Social Science Page
    'Communications & Media': 'rgb(255, 207, 147)', // Communications & Media Page
    'Service': 'rgb(169, 255, 170)', // Service Page
    'Research': 'rgb(247, 183, 244)', // Research Page
    'Leadership': 'rgb(248, 251, 154)', // Leadership Page
    'Vocational & Technical Studies': 'rgb(220, 150, 44)' // Vocational & Technical Studies Page
}
const barBackgrounds = { // Map of Bar Backgrounds
    'STEM': 'rgb(232, 107, 107)', // STEM Page
    'Health & Medicine': 'rgb(142, 158, 236)', // Health & Medicine Page
    'Business & Economics': 'rgb(182, 45, 102)', // Business & Economics Page
    'Law': 'rgb(126, 99, 20)', // Law Page
    'Arts & Humanities': 'rgb(118, 50, 160)', // Arts & Humanities Page
    'Social Science': 'rgb(49, 43, 43)', // Social Science Page
    'Communications & Media': 'rgb(221, 218, 118)', // Communications & Media Page
    'Service': 'rgb(84, 213, 185)', // Service Page
    'Research': 'rgb(221, 72, 132)', // Research Page
    'Leadership': 'rgb(186, 247, 195)', // Leadership Page
    'Vocational & Technical Studies': 'rgb(63, 51, 0)' // Vocational & Technical Studies Page
}
const linkTagTextColors = {
    'STEM': 'rgb(132, 57, 230)', // STEM Page
    'Health & Medicine': 'rgb(132, 16, 97)', // Health & Medicine Page
    'Business & Economics': 'rgb(154, 21, 21)', // Business & Economics Page
    'Law': 'rgb(115, 136, 39)', // Law Page
    'Arts & Humanities': 'rgb(17, 35, 136)', // Arts & Humanities Page
    'Social Science': 'rgb(35, 31, 31)', // Social Science Page
    'Communications & Media': 'rgb(91, 61, 16)', // Communications & Media Page
    'Service': 'rgb(11, 101, 30)', // Service Page
    'Research': 'rgb(120, 20, 120)', // Research Page
    'Leadership': 'rgb(146, 142, 40)', // Leadership Page
    'Vocational & Technical Studies': 'rgb(50, 40, 5)' // Vocational & Technical Studies Page
}

function changeBackground() { // Set Background Color
    const background = backgrounds[documentTitle]; // Get Background from Map
    const categoryBackground = categoryBackgrounds[documentTitle];
    const barBackground = barBackgrounds[documentTitle];
    body.style.background = background; // Set Background
    categoryTags.forEach(tag => { tag.style.background = categoryBackground; }); // Set Category Background
    barTags.forEach(tag => { tag.style.background = barBackground; }); // Set Bar Background
}

function returnToHome() { // Return To Home Button
    const returnTag = elements[1]; // Get Return Tag
    returnTag.addEventListener('click', (event) => { // Listen for Click
        event.preventDefault(); // Prevent Being Redirected 
        gsap.to(body, { duration: 0.5, opacity: 0, background: 'black' }); // Fade Out
        setTimeout(() => { window.location.href = '/index.html' }, 400); // Redirect After 0.4s
    });
}