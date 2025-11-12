let startTime;
let elapsedTime = 0;
let timerInterval;
let running = false;

const timeDisplay = document.getElementById('time-display');
const startStopButton = document.getElementById('start-stop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const exportButton = document.getElementById('export');
const lapsList = document.getElementById('laps-list');
const themeSwitch = document.getElementById('theme-switch');

// Format time with milliseconds
function formatTime(time) {
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);
    const milliseconds = Math.floor(time % 1000);
    return `${hours.toString().padStart(2,'0')}:${minutes.toString().padStart(2,'0')}:${seconds.toString().padStart(2,'0')}.${milliseconds.toString().padStart(3,'0')}`;
}

// Update display
function updateDisplay() {
    const currentTime = Date.now();
    elapsedTime = currentTime - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start/Pause stopwatch
startStopButton.addEventListener('click', () => {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateDisplay, 10);
        startStopButton.textContent = 'Pause';
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopButton.textContent = 'Start';
        running = false;
    }
});

// Reset stopwatch
resetButton.addEventListener('click', () => {
    clearInterval(timerInterval);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00.000';
    lapsList.innerHTML = '';
    startStopButton.textContent = 'Start';
    running = false;
});

// Add lap
lapButton.addEventListener('click', () => {
    if (running) {
        const li = document.createElement('li');
        li.textContent = formatTime(elapsedTime);
        lapsList.appendChild(li);
        lapsList.scrollTop = lapsList.scrollHeight;
    }
});

// Export laps to CSV
exportButton.addEventListener('click', () => {
    let csv = "Lap No.,Time\n";
    const laps = lapsList.querySelectorAll('li');
    laps.forEach((lap, index) => {
        csv += `${index+1},${lap.textContent}\n`;
    });
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'laps.csv';
    a.click();
    window.URL.revokeObjectURL(url);
});

// Dark/Light mode toggle
themeSwitch.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeSwitch.checked);
});
