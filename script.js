const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const counter = document.getElementById("counter");

let tasks = [];

/* ========= ADD TASK ========= */
function addTask() {

    const text = taskInput.value.trim();
    if (text === "") return;

    const newTask = {
        id: Date.now(),
        text: text,
        completed: false
    };

    tasks.push(newTask);

    taskInput.value = "";

    saveTasks();
    renderTasks();
    updateCounter();
}

/* ========= RENDER ========= */
function renderTasks() {

    taskList.innerHTML = "";

    tasks.forEach(task => {

        const li = document.createElement("li");

        li.innerHTML = `
            <span class="${task.completed ? "completed" : ""}">
                ${task.text}
            </span>

            <div>
                <button onclick="toggleTask(${task.id})">✓</button>
                <button onclick="deleteTask(${task.id})">✕</button>
            </div>
        `;

        taskList.appendChild(li);
    });
}

/* ========= TOGGLE ========= */
function toggleTask(id) {

    tasks = tasks.map(task => {

        if (task.id === id) {
            return {
                ...task,
                completed: !task.completed
            };
        }

        return task;
    });

    saveTasks();
    renderTasks();
    updateCounter();
}

/* ========= DELETE ========= */
function deleteTask(id) {

    const confirmDelete = confirm("¿Eliminar esta tarea?");
    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
    updateCounter();
}

/* ========= COUNTER ========= */
function updateCounter() {
    const pending = tasks.filter(t => !t.completed).length;
    counter.textContent = `Tareas pendientes: ${pending}`;
}

/* ========= STORAGE ========= */
function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {

    const stored = localStorage.getItem("tasks");

    tasks = stored ? JSON.parse(stored) : [];

    renderTasks();
    updateCounter();
}

/* ========= EVENTS ========= */
addBtn.addEventListener("click", addTask);

/* ========= INIT ========= */
loadTasks();