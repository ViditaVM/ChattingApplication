const cover = document.getElementById('cover');
const disc = document.getElementById('disc');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const timer = document.getElementById('timer');
const duration = document.getElementById('duration');
const prev = document.getElementById('prev');
const play = document.getElementById('play');
const next = document.getElementById('next');
let songIndex = 0;

// Songs info
const songs = [
  {
    title: 'Lab Par Aaye',
    artist: 'Javed Ali',
    coverPath: 'assets/images/classical.jpeg',
    discPath: 'assets/music/Labb_Par_Aaye.mp3',
    duration: '3:01',
  },
  {
    title: 'Virah',
    artist: 'Shankar Mahadevan',
    coverPath: 'assets/images/classical.jpeg',
    discPath: 'assets/music/Virah.mp3',
    duration: '3:10',
  },
  {
    title: 'Aruni Kirani',
    artist: 'Mahesh kale',
    coverPath: 'assets/images/classical.jpeg',
    discPath: 'assets/music/Aruni_Kirani.mp3',
    duration: '3:59',
  },
  {
    title: 'Mohe Rang Do Laal',
    artist: 'Shreya Ghoshal',
    coverPath: 'assets/images/classical.jpeg',
    discPath: 'assets/music/Mohe_Rang_Do_Laal.mp3',
    duration: '3:58',
  },
  {
    title: 'Ghoomar',
    artist: 'Shreya Ghoshal',
    coverPath: 'assets/images/classical.jpeg',
    discPath: 'assets/music/Ghoomar.mp3',
    duration: '3:19',
  },
];

// Load song initially
loadSong(songs[songIndex]);

// Load the given song
function loadSong(song) {
  cover.src = song.coverPath;
  disc.src = song.discPath;
  title.textContent = song.title;
  artist.textContent = song.artist;
  duration.textContent = song.duration;
}

// Toggle play and pause
function playPauseMedia() {
  if (disc.paused) {
    disc.play();
  } else {
    disc.pause();
  }
}

// Update icon
function updatePlayPauseIcon() {
  if (disc.paused) {
    play.classList.remove('fa-pause');
    play.classList.add('fa-play');
  } else {
    play.classList.remove('fa-play');
    play.classList.add('fa-pause');
  }
}

// Update progress bar
function updateProgress() {
  progress.style.width = (disc.currentTime / disc.duration) * 100 + '%';

  let minutes = Math.floor(disc.currentTime / 60);
  let seconds = Math.floor(disc.currentTime % 60);
  if (seconds < 10) {
    seconds = '0' + seconds;
  }
  timer.textContent = `${minutes}:${seconds}`;
}

// Reset the progress
function resetProgress() {
  progress.style.width = 0 + '%';
  timer.textContent = '0:00';
}

// Go to previous song
function gotoPreviousSong() {
  if (songIndex === 0) {
    songIndex = songs.length - 1;
  } else {
    songIndex = songIndex - 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow) {
    playPauseMedia();
  }
}

// Go to next song
function gotoNextSong(playImmediately) {
  if (songIndex === songs.length - 1) {
    songIndex = 0;
  } else {
    songIndex = songIndex + 1;
  }

  const isDiscPlayingNow = !disc.paused;
  loadSong(songs[songIndex]);
  resetProgress();
  if (isDiscPlayingNow || playImmediately) {
    playPauseMedia();
  }
}

// Change song progress when clicked on progress bar
function setProgress(ev) {
  const totalWidth = this.clientWidth;
  const clickWidth = ev.offsetX;
  const clickWidthRatio = clickWidth / totalWidth;
  disc.currentTime = clickWidthRatio * disc.duration;
}

// Play/Pause when play button clicked
play.addEventListener('click', playPauseMedia);

// Various events on disc
disc.addEventListener('play', updatePlayPauseIcon);
disc.addEventListener('pause', updatePlayPauseIcon);
disc.addEventListener('timeupdate', updateProgress);
disc.addEventListener('ended', gotoNextSong.bind(null, true));

// Go to next song when next button clicked
prev.addEventListener('click', gotoPreviousSong);

// Go to previous song when previous button clicked
next.addEventListener('click', gotoNextSong.bind(null, false));

// Move to different place in the song
progressContainer.addEventListener('click', setProgress);
