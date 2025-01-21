// Getting DOM elements
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progressBar = document.getElementById('progress-bar');
const volumeBar = document.getElementById('volume-bar');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');

// Songs array (Example)
const songs = [
    { title: 'Song 1', artist: 'Artist 1', file: 'song1.mp3' },
    { title: 'Song 2', artist: 'Artist 2', file: 'song2.mp3' },
    { title: 'Song 3', artist: 'Artist 3', file: 'song3.mp3' }
];

let currentSongIndex = 0;

// Function to load the song based on the index
function loadSong(songIndex) {
    const song = songs[songIndex];
    audioPlayer.src = song.file;
    songTitle.textContent = song.title;
    songArtist.textContent = song.artist;
    audioPlayer.load();
}

// Play or pause the music
function togglePlay() {
    if (audioPlayer.paused) {
        audioPlayer.play();
        playBtn.textContent = '⏸️';  // Change to pause icon when playing
    } else {
        audioPlayer.pause();
        playBtn.textContent = '▶️';  // Change to play icon when paused
    }
}

// Update progress bar
audioPlayer.addEventListener('timeupdate', () => {
    const progress = (audioPlayer.currentTime / audioPlayer.duration) * 100;
    progressBar.value = progress;
});

// Change song progress
progressBar.addEventListener('input', () => {
    const progress = (progressBar.value / 100) * audioPlayer.duration;
    audioPlayer.currentTime = progress;
});

// Change volume
volumeBar.addEventListener('input', () => {
    audioPlayer.volume = volumeBar.value / 100;
});

// Previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.textContent = '⏸️';  // Set to pause when song starts
});

// Next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
    audioPlayer.play();
    playBtn.textContent = '⏸️';  // Set to pause when song starts
});

// Initial load of the first song
loadSong(currentSongIndex);

// Play button event
playBtn.addEventListener('click', togglePlay);
