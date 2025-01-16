let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let isBreakMode = false;
const WORK_TIME = 25 * 60;
const BREAK_TIME = 5 * 60;

// Initialize state when extension loads
chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.set({ 
    timeLeft: WORK_TIME,
    isRunning: false,
    isBreakMode: false
  });
});

// Function to update the timer
function updateTimer() {
  if (isRunning && timeLeft > 0) {
    timeLeft--;
    const progress = isBreakMode ? 
      ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100 :
      ((WORK_TIME - timeLeft) / WORK_TIME) * 100;

    chrome.storage.local.set({ timeLeft, isRunning, progress });

    // Send update to the popup with progress information
    chrome.runtime.sendMessage({ 
      action: "update", 
      timeLeft,
      progress
    });

    if (timeLeft === 0) {
      isRunning = false;
      chrome.storage.local.set({ isRunning });
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Pomodoro Timer',
        message: isBreakMode ? 'Break time is over! Time to work.' : 'Time is up! Take a break.'
      });
      chrome.alarms.clear("pomodoroTimer");
    }
  }
}

// Listener for messages from popup
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  switch (request.action) {
    case "start":
      if (!isRunning) {
        isRunning = true;
        chrome.storage.local.set({ isRunning });
        updateTimer(); // Update immediately
        chrome.alarms.create("pomodoroTimer", { periodInMinutes: 1/60 }); // Update every second
        sendResponse({ success: true });
      }
      break;

    case "pause":
      isRunning = false;
      chrome.storage.local.set({ isRunning });
      chrome.alarms.clear("pomodoroTimer");
      sendResponse({ success: true });
      break;

    case "reset":
      isRunning = false;
      timeLeft = isBreakMode ? BREAK_TIME : WORK_TIME;
      chrome.storage.local.set({ 
        timeLeft, 
        isRunning,
        progress: 0
      });
      chrome.alarms.clear("pomodoroTimer");
      sendResponse({ success: true });
      break;

    case "toggleMode":
      isBreakMode = !isBreakMode;
      timeLeft = isBreakMode ? BREAK_TIME : WORK_TIME;
      isRunning = true;
      chrome.storage.local.set({ 
        timeLeft,
        isRunning,
        isBreakMode,
        progress: 0
      });
      updateTimer();
      chrome.alarms.create("pomodoroTimer", { periodInMinutes: 1/60 });
      sendResponse({ success: true });
      break;

    case "getState":
      const progress = isBreakMode ? 
        ((BREAK_TIME - timeLeft) / BREAK_TIME) * 100 :
        ((WORK_TIME - timeLeft) / WORK_TIME) * 100;
      
      sendResponse({
        timeLeft,
        isRunning,
        isBreakMode,
        progress
      });
      break;
  }
  return true; // Keep message channel open for async response
});

// Update timer on alarm
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    updateTimer();
  }
});