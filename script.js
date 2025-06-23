let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastDate = localStorage.getItem("lastDate");

const today = new Date().toDateString();

if (lastDate !== today) {
  if (tasks.length && tasks.every(task => task.completed)) {
    streak += 1;
  } else {
    streak = 0;
  }
  tasks = []; // clear tasks for new day
  localStorage.setItem("lastDate", today);
}

document.getElementById("streakCount").textContent = streak;

function updateUI() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  let completed = 0;

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = task.completed ? "completed" : "";

    const span = document.createElement("span");
    span.textContent = task.text;
    span.onclick = () => toggleTask(index);
    li.appendChild(span);

    taskList.appendChild(li);

    if (task.completed) completed++;
  });

  document.getElementById("completedCount").textContent = completed;
  document.getElementById("totalCount").textContent = tasks.length;

  localStorage.setItem("tasks", JSON.stringify(tasks));
  localStorage.setItem("streak", streak);
}

function addTask() {
  const input = document.getElementById("taskInput");
  const text = input.value.trim();
  if (text === "") return;

  tasks.push({ text, completed: false });
  input.value = "";
  updateUI();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  updateUI();
}

updateUI();
