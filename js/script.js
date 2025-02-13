function showPage(pageNumber) {
    // Hide all pages
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    // Show requested page
    document.getElementById(`page${pageNumber}`).classList.add('active');
}

function handleResponse(response) {
    const mascot = document.getElementById('responseMascot');
    const finalMascot = document.querySelector('#page3 .mascot');
    const finalHeading = document.querySelector('#page3 h1');
    const finalText = document.querySelector('#page3 p');

    if (response) {
        mascot.textContent = '😻';
        mascot.style.color = '#ff69b4';
        finalMascot.textContent = '🌸💐🌺';
        finalHeading.textContent = 'Thank you! 🥰';
        finalText.textContent = "Here's flowers for you!";
    } else {
        mascot.textContent = '😿';
        mascot.classList.add('sad');
        mascot.style.color = '#666';
        finalMascot.textContent = '🌸💐🌺';
        finalHeading.textContent = 'Oh... okay... 😢💔';
        finalText.textContent = "I understand... here's still the flowers tho";
    }

    // Show final page after delay
    setTimeout(() => {
        showPage(3);
    }, 1500);
}
