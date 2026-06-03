function switchTab(element) {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    element.classList.add('active');

    const sections = document.querySelectorAll('.grid-section');
    sections.forEach(section => section.style.display = 'none');
    document.querySelector(`.${element.getAttribute('data-target')}`).style.display = 'block';
}

function prevTrack() {
    // Logic to play previous track
}

function playPauseTrack() {
    // Logic to play or pause the current track
}

function nextTrack() {
    // Logic to play next track
}

function decreaseVolume() {
    const volumeSlider = document.querySelector('.volume-slider');
    let volume = volumeSlider.value;
    if (volume > 0) {
        volume--;
        volumeSlider.value = volume;
        updateProgress(volume);
    }
}

function increaseVolume() {
    const volumeSlider = document.querySelector('.volume-slider');
    let volume = volumeSlider.value;
    if (volume < 100) {
        volume++;
        volumeSlider.value = volume;
        updateProgress(volume);
    }
}

function updateProgress(volume) {
    const progressBar = document.querySelector('.progress-bar');
    progressBar.style.width = `${volume}%`;
}
