let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

function formatTime(ms) {
  const totalSeconds = Math.floor(ms / 1000);
  const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
  const minutes = String(Math.floor((totalSeconds % 3600) / 60)).padStart(2, '0');
  const seconds = String(totalSeconds % 60).padStart(2, '0');
  const hundredths = String(Math.floor((ms % 1000) / 10)).padStart(2, '0');
  return `${hours}:${minutes}:${seconds}:${hundredths}`;
}

function updateDisplay() {
  document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
  const startButton = document.getElementById('startBtn');

  if (!running) {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
      elapsedTime = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
    startButton.textContent = 'Stop';
    startButton.classList.add('active');
  } else {
    pause();
    startButton.textContent = 'Start';
    startButton.classList.remove('active');
  }
}

function pause() {
  clearInterval(timerInterval);
  running = false;
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  elapsedTime = 0;
  updateDisplay();
  document.getElementById('laps').innerHTML = '';
  const startButton = document.getElementById('startBtn');
  startButton.textContent = 'Start';
  startButton.classList.remove('active');
}

function lap() {
  if (!running) return;
  const lapList = document.getElementById('laps');
  if (lapList.children.length >= 10) {
    lapList.removeChild(lapList.firstChild);
  }
  const lapItem = document.createElement('li');
  lapItem.textContent = `Lap ${lapList.children.length + 1}: ${formatTime(elapsedTime)}`;
  lapList.appendChild(lapItem);
}