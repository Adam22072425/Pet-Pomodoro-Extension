document.addEventListener("DOMContentLoaded", () => {
  let timer = 1500; // 25 minutes in seconds
  let interval;

  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("start");
  const resetBtn = document.getElementById("reset");
  const breakBtn = document.getElementById("break");
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task");
  const taskList = document.getElementById("tasks");

  function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    if (!interval) {
      interval = setInterval(() => {
        if (timer > 0) {
          timer--;
          updateTimerDisplay();
        } else {
          clearInterval(interval);
          alert("Time's up! Take a break.");
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(interval);
    interval = null;
    timer = 1500; // Reset to 25 minutes
    updateTimerDisplay();
  }

  function startBreak() {
    clearInterval(interval);
    timer = 300; // 5 minutes for break
    updateTimerDisplay();
    interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        updateTimerDisplay();
      } else {
        clearInterval(interval);
        alert("Break is over!");
        resetTimer();
      }
    }, 1000);
  }

  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  breakBtn.addEventListener("click", startBreak);

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (!taskText) return;

    const li = document.createElement("li");
    li.classList.add("task-item");

    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    taskContent.classList.add("task-content");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.classList.add("task-checkbox");
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        taskContent.style.textDecoration = "line-through";
        taskContent.style.color = "#888";
      } else {
        taskContent.style.textDecoration = "none";
        taskContent.style.color = "#000";
      }
    });document.addEventListener("DOMContentLoaded", () => {
  let timer = 1500; // 25 minutes in seconds
  let interval;

  const timerDisplay = document.getElementById("timer");
  const startBtn = document.getElementById("start");
  const resetBtn = document.getElementById("reset");
  const breakBtn = document.getElementById("break");
  const taskInput = document.getElementById("task-input");
  const addTaskBtn = document.getElementById("add-task");
  const taskList = document.getElementById("tasks");

  function updateTimerDisplay() {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;
    timerDisplay.textContent = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;
  }

  function startTimer() {
    if (!interval) {
      interval = setInterval(() => {
        if (timer > 0) {
          timer--;
          updateTimerDisplay();
        } else {
          clearInterval(interval);
          alert("Time's up! Take a break.");
        }
      }, 1000);
    }
  }

  function resetTimer() {
    clearInterval(interval);
    interval = null;
    timer = 1500; // Reset to 25 minutes
    updateTimerDisplay();
  }

  function startBreak() {
    clearInterval(interval);
    timer = 300; // 5 minutes for break
    updateTimerDisplay();
    interval = setInterval(() => {
      if (timer > 0) {
        timer--;
        updateTimerDisplay();
      } else {
        clearInterval(interval);
        alert("Break is over!");
        resetTimer();
      }
    }, 1000);
  }

  startBtn.addEventListener("click", startTimer);
  resetBtn.addEventListener("click", resetTimer);
  breakBtn.addEventListener("click", startBreak);

 addTaskBtn.addEventListener("click", () => {
  const taskText = taskInput.value.trim();
  if (!taskText) return;

  const li = document.createElement("li");
  li.classList.add("task-item");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("task-checkbox");
  checkbox.addEventListener("change", () => {
    if (checkbox.checked) {
      taskContent.classList.add("completed");
    } else {
      taskContent.classList.remove("completed");
    }
  });

  const taskContent = document.createElement("span");
  taskContent.textContent = taskText;
  taskContent.classList.add("task-content");

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.classList.add("delete-btn");
  deleteBtn.addEventListener("click", () => {
    taskList.removeChild(li);
  });

  li.appendChild(checkbox);
  li.appendChild(taskContent);
  li.appendChild(deleteBtn);
  taskList.appendChild(li);

  taskInput.value = "";
});


  updateTimerDisplay();
});


    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => {
      taskList.removeChild(li);
    });

    li.appendChild(checkbox);
    li.appendChild(taskContent);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);

    taskInput.value = "";
  });

  updateTimerDisplay();
});
