document.addEventListener('DOMContentLoaded', () => {
  const timerDisplay = document.getElementById('timer');
  const startBtn = document.getElementById('start');
  const resetBtn = document.getElementById('reset');
  const breakBtn = document.getElementById('break');
  const progressBar = document.getElementById('progress');
  const catImg = document.getElementById('catImg');

  function updateDisplay(timeLeft, progress) {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    progressBar.style.width = `${progress}%`;
    
    // Update cat animation based on progress
    if (progress > 75) {
      catImg.src = 'images/cat-tired.gif';
    } else if (progress > 50) {
      catImg.src = 'images/cat-working.gif';
    } else if (progress > 25) {
      catImg.src = 'images/cat-start.gif';
    } else {
      catImg.src = 'images/cat-start.png';
    }
  }

  // Initialize timer state
  chrome.runtime.sendMessage({ action: 'getState' }, (response) => {
    if (response) {
      updateDisplay(response.timeLeft, response.progress);
      startBtn.textContent = response.isRunning ? 'Pause' : 'Start';
      breakBtn.textContent = response.isBreakMode ? 'Work' : 'Break';
    }
  });

  // Listen for timer updates
  chrome.runtime.onMessage.addListener((request) => {
    if (request.action === 'update') {
      updateDisplay(request.timeLeft, request.progress);
    }
    return true;
  });

  startBtn.addEventListener('click', () => {
    const action = startBtn.textContent === 'Start' ? 'start' : 'pause';
    chrome.runtime.sendMessage({ action }, (response) => {
      if (response.success) {
        startBtn.textContent = action === 'start' ? 'Pause' : 'Start';
      }
    });
  });

  resetBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'reset' }, (response) => {
      if (response.success) {
        startBtn.textContent = 'Start';
        updateDisplay(25 * 60, 0);
      }
    });
  });

  breakBtn.addEventListener('click', () => {
    chrome.runtime.sendMessage({ action: 'toggleMode' }, (response) => {
      if (response.success) {
        chrome.runtime.sendMessage({ action: 'getState' }, (state) => {
          breakBtn.textContent = state.isBreakMode ? 'Work' : 'Break';
          startBtn.textContent = 'Pause';
        });
      }
    });
  });

  // Task Management (rest of the task management code remains the same)
  // ... [Previous task management code]
});