function fadeInAudio(audioElement, duration = 2000) {
    audioElement.volume = 0; // Start with volume at 0
    audioElement.play(); // Start playing the audio

    const fadeInInterval = 50; // Update volume every 50ms
    const volumeIncrement = fadeInInterval / duration; // Calculate volume step

    const fade = setInterval(() => {
        if (audioElement.volume < 1) {
            audioElement.volume += volumeIncrement; // Gradually increase volume
        } else {
            clearInterval(fade); // Stop the interval when volume reaches 1
        }
    }, fadeInInterval);
}

function fadeOutAudio(audioElement, duration = 2000) {
    const fadeOutInterval = 50; // Reduce volume every 50ms
    const volumeDecrement = fadeOutInterval / duration; // Calculate volume step

    const fade = setInterval(() => {
        if (audioElement.volume > 0) {
            audioElement.volume -= volumeDecrement; // Gradually decrease volume
        } else {
            clearInterval(fade); // Stop fading when volume reaches 0
            audioElement.pause(); // Pause the audio when fully faded out
        }
    }, fadeOutInterval);
}

function setupFadeOut(audioElement) {
    audioElement.addEventListener("timeupdate", function () {
        if (audioElement.duration - audioElement.currentTime <= 5) { // If 5 seconds left
            fadeOutAudio(audioElement, 2000); // Start fade-out effect (2 seconds)
            audioElement.removeEventListener("timeupdate", arguments.callee); // Remove to prevent multiple triggers
        }
    });
}

function showPage(pageNumber, response) {
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });

    const page = document.getElementById(`page${pageNumber}`);
    page.classList.add('active');

    // Play audio with fade-in when reaching page 3
    if (pageNumber === 3) {
        const audio = document.getElementById('page3Audio');
        audio.volume = 0; // Reset volume to 0 before playing
        audio.play(); // Start playing the selected song
        fadeInAudio(audio, 3000); // 3-second fade-in
        setupFadeOut(audio); // Prepare fade-out effect
    }
}

function handleResponse(response) {
    const mascot = document.getElementById('responseMascot');
    const audio = document.getElementById('page3Audio');
    const finalElements = {
        mascot: document.querySelector('#page3 .mascot'),
        heading: document.querySelector('#page3 h1'),
        text: document.querySelector('#page3 p'),
        button: document.querySelector('#page3 button')
    };

    if (response) {
        mascot.textContent = '😻';
        mascot.classList.add('happy-dance');
        mascot.style.color = '#ff69b4';
        finalElements.heading.textContent = 'Aww thank you! 🥰';
        finalElements.text.textContent = "Here's flowers for you and some music while we're at it!";
        finalElements.button.textContent = "Change your mind? 😔";
        audio.src = "audio/audio.mp3";
    } else {
        mascot.textContent = '😿';
        mascot.classList.add('sad');
        mascot.style.color = '#666';
        finalElements.heading.textContent = 'Oh... okay... 😢💔';
        finalElements.text.textContent = "I understand... here's still the flowers tho";
        finalElements.button.textContent = "Change your mind? 😊";
        audio.src = "audio/audio2.mp3";
    }

    setTimeout(() => showPage(3, response), 1100);
}

function handleReset() {
    const audio = document.getElementById('page3Audio');
    const button = document.querySelector('#page3 button');

    // Disable the button to prevent multiple clicks
    button.disabled = true;
    button.textContent = "Changing your mind.. 🎶";

    // Fade out the audio before reloading
    fadeOutAudio(audio, 2000); // 2-second fade-out

    // Reload the page after the fade-out completes
    setTimeout(() => {
        location.reload();
    }, 2000); // Match the fade-out duration
}

// Copy protection
document.addEventListener('copy', (event) => {
    event.preventDefault();
    alert("Nono yaa.");
});
