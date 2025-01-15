let timeLeft = 25 * 60; // 25 minutes in seconds
let isRunning = false;
let totalTime = timeLeft;

// Function to update the timer
function updateTimer() {
  if (isRunning && timeLeft > 0) {
    timeLeft--;
    chrome.storage.local.set({ timeLeft, isRunning });

    // Send update to the popup
    chrome.runtime.sendMessage({ action: "update", timeLeft });

    if (timeLeft === 0) {
      isRunning = false;
      chrome.storage.local.set({ isRunning });
      chrome.notifications.create({
        type: 'basic',
        iconUrl: 'icons/icon48.png',
        title: 'Pomodoro Timer',
        message: 'Time is up! Take a break.'
      });
    }
  }
}

// Start the timer
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.action === "start") {
    isRunning = true;
    chrome.storage.local.set({ isRunning });
    chrome.alarms.create("pomodoroTimer", { periodInMinutes: 1 / 60 }); // Update every second
    sendResponse({ success: true });
  } else if (request.action === "pause") {
    isRunning = false;
    chrome.storage.local.set({ isRunning });
    chrome.alarms.clear("pomodoroTimer");
    sendResponse({ success: true });
  } else if (request.action === "reset") {
    isRunning = false;
    timeLeft = totalTime;
    chrome.storage.local.set({ timeLeft, isRunning });
    chrome.alarms.clear("pomodoroTimer");
    sendResponse({ success: true });
  } else if (request.action === "getState") {
    chrome.storage.local.get(["timeLeft", "isRunning"], (data) => {
      sendResponse(data);
    });
    return true; // Keep the message channel open for sendResponse
  }
});

// Update the timer every second
chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === "pomodoroTimer") {
    updateTimer();
  }
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.type === 'getPosition') {
    chrome.storage.local.get('position', function(result) {
      sendResponse({ position: result.position });
    });
  } else if (request.type === 'savePosition') {
    chrome.storage.local.set({ position: request.position }, function() {
      console.log('Position saved:', request.position);
    });
  }

});
});