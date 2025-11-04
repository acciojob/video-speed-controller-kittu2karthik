const player = document.querySelector('.player');
const video = player.querySelector('.player__video');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const rewindBtn = player.querySelector('.rewind');
const forwardBtn = player.querySelector('.forward');
const sliders = player.querySelectorAll('.player__slider');

// Toggle play/pause
function togglePlay() {
  video[video.paused ? 'play' : 'pause']();
}

// Update play/pause button icon
function updateButton() {
  toggle.textContent = video.paused ? '►' : '❚❚';
}

// Update progress bar
function handleProgress() {
  const percent = (video.currentTime / video.duration) * 100;
  progressBar.style.width = `${percent}%`;
}

// Scrub through video
function scrub(e) {
  const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
  video.currentTime = scrubTime;
}

// Handle volume & playback speed
function handleRangeUpdate() {
  if (this.name === 'volume') video.volume = this.value;
  if (this.name === 'playbackSpeed') video.playbackRate = this.value;
}

// Rewind / forward
function skip(amount) {
  video.currentTime += amount;
}

// Event listeners
video.addEventListener('click', togglePlay);
video.addEventListener('play', updateButton);
video.addEventListener('pause', updateButton);
video.addEventListener('timeupdate', handleProgress);

toggle.addEventListener('click', togglePlay);
rewindBtn.addEventListener('click', () => skip(-10));
forwardBtn.addEventListener('click', () => skip(25));
sliders.forEach(slider => slider.addEventListener('input', handleRangeUpdate));

let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);
