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
    
    if(response) {
        mascot.textContent = '😻';
        mascot.style.color = '#ff69b4';
    } else {
        mascot.textContent = '😿';
        mascot.classList.add('sad');
        mascot.style.color = '#666';
    }

    // Show flowers after delay
    setTimeout(() => {
        showPage(3);
    }, 1500);
}