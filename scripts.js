document.addEventListener('DOMContentLoaded', () => {
    loadPopularTracks();
    showSection('home');
});

function showSection(section) {
    const sections = document.querySelectorAll('.grid-section, .library-section');
    sections.forEach(sec => sec.style.display = 'none');
    if (section === 'browse' || section === 'library') {
        document.querySelector(`#${section}`).style.display = 'block';
    } else {
        document.querySelector(`#${section}`).style.display = 'flex';
    }
}

function loadPopularTracks() {
    const popularTracksContainer = document.getElementById('popular-tracks');
    // Replace with actual data fetching logic
    const tracks = [
        { title: 'Midnight City', artist: 'M83', image: 'https://picsum.photos/200?random=1' },
        { title: 'Starboy', artist: 'The Weeknd', image: 'https://picsum.photos/200?random=2' },
        // Add more tracks
    ];
    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.classList.add('grid-item');
        trackElement.innerHTML = `
            <img src="${track.image}" alt="cover">
            <h3>${track.title}</h3>
            <p>${track.artist}</p>
        `;
        popularTracksContainer.appendChild(trackElement);
    });
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
    const progressBar = document.getElementById('progress-bar');
    progressBar.style.width = `${volume}%`;
}
