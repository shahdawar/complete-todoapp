// Menu Buttons
const completed = document.getElementById("completed");
const pending = document.getElementById("pending");
const all = document.getElementById("alltasks");

// Add task inputs
const title = document.getElementById("tasktitle");
const description = document.getElementById("taskdescription");
const addTask = document.getElementById("taskButton");
const logout = document.getElementById("logout");
logout.addEventListener("click", () => {
  localStorage.removeItem("isLoggedIn");
  window.location.href = "index.html";
});

// Task portion
const TasksArea = document.getElementById("tasksarea");
let tasks = [];
const storedTasks = JSON.parse(localStorage.getItem("tasks"));
if (storedTasks) {
  tasks = storedTasks;
}
function addTasks() {
  const taskTitle = title.value.trim();
  const taskDescription = description.value.trim();
  if (taskTitle === "" || taskDescription === "") {
    alert("Please input task title and description");
    return;
  }

  let isduplicate = false;
  tasks.forEach((task) => {
    if (task.title === taskTitle && task.description === taskDescription) {
      isduplicate = true;
    }
  });
  if (isduplicate) {
    alert("Duplicated value! Change the titile or description please.");
    return;
  }
  const task = {
    id: tasks.length + 1,
    title: taskTitle,
    description: taskDescription,
    status: "Pending",
  };
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  displayTasks();
  title.value = "";
  description.value = "";
}
function displayTasks(filter = "All") {
  TasksArea.innerHTML = "";

  let filteredTasks = tasks;

  if (filter === "Completed") {
    filteredTasks = tasks.filter((task) => task.status === "Completed");
  } else if (filter === "Pending") {
    filteredTasks = tasks.filter((task) => task.status === "Pending");
  }

  filteredTasks.forEach((task) => {
    const taskElement = document.createElement("div");
    taskElement.classList.add("task-style");

    taskElement.innerHTML = `
      <p><strong>Id:</strong> ${task.id}</p>
      <p><strong>Title:</strong> ${task.title}</p>
      <p><strong>Description:</strong> ${task.description}</p>
      <p><strong>Status:</strong> ${task.status}</p>

      <div class="task-actions">
        <input type="checkbox" class="task-checkbox">
        <button onclick="deleteTask(${task.id})">Delete Task</button>
      </div>
    `;

    const checkbox = taskElement.querySelector(".task-checkbox");

    if (task.status === "Completed") {
      checkbox.checked = true;
      taskElement.style.backgroundColor = "#386a71";
      taskElement.style.color = "#fff";
    }

    checkbox.addEventListener("change", function () {
      task.status = checkbox.checked ? "Completed" : "Pending";
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks(filter);
    });

    TasksArea.appendChild(taskElement);
  });
}

function deleteTask(id) {
  for (var i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  }

  displayTasks();
}

// Sidebar buttons functional

completed.addEventListener("click", function () {
  displayTasks("Completed");
});

pending.addEventListener("click", function () {
  displayTasks("Pending");
});

all.addEventListener("click", function () {
  displayTasks("All");
});

if (localStorage.getItem("isLoggedIn") !== "true") {
  window.location.href = "index.html";
}
displayTasks();
