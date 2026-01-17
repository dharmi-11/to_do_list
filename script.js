/**
 * WEEK 6: DOM MANIPULATION + EVENTS
 */

// --- DAY 1: SELECTING ELEMENTS ---
const todoForm = document.querySelector('#todo-form');
const todoInput = document.querySelector('#todo-input');
const todoList = document.querySelector('#todo-list');

// --- DAY 5: INITIALIZE (Load from LocalStorage) ---
document.addEventListener('DOMContentLoaded', () => {
    const savedTasks = getTasksFromStorage();
    savedTasks.forEach(task => {
        // We pass both the text and the completion status
        createTaskElement(task.text, task.completed);
    });
});

// --- DAY 3: EVENT LISTENERS (Submit) ---
todoForm.addEventListener('submit', (e) => {
    // DAY 4: preventDefault
    e.preventDefault(); 
    
    const taskText = todoInput.value.trim();
    if (taskText !== "") {
        createTaskElement(taskText, false);
        saveTaskToStorage(taskText);
        todoInput.value = ''; 
    }
});

// --- DAY 2: CREATING/MODIFYING ELEMENTS ---
function createTaskElement(text, isCompleted) {
    const li = document.createElement('li');
    if (isCompleted) li.classList.add('completed');
    
    li.innerHTML = `
        <div class="task-content">
            <input type="checkbox" class="complete-checkbox" ${isCompleted ? 'checked' : ''}>
            <span>${text}</span>
        </div>
        <button class="delete-btn">Delete</button>
    `;
    
    // Day 2: appendChild
    todoList.appendChild(li);
}

// --- DAY 4: EVENT DELEGATION ---
// One listener on parent <ul> to handle all clicks inside it
todoList.addEventListener('click', (e) => {
    // Day 1: DOM Traversal to find the specific list item
    const item = e.target.closest('li');
    const taskText = item.querySelector('span').innerText;

    // Logic for Delete Button
    if (e.target.classList.contains('delete-btn')) {
        item.remove(); // Day 2: remove()
        removeTaskFromStorage(taskText);
    }

    // Logic for Checkbox (Tick mark)
    if (e.target.classList.contains('complete-checkbox')) {
        item.classList.toggle('completed'); // Day 2: classList toggle
        updateTaskStatusInStorage(taskText);
    }
});

// --- DAY 5: LOCALSTORAGE PERSISTENCE ---
function getTasksFromStorage() {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

function saveTaskToStorage(taskText) {
    const tasks = getTasksFromStorage();
    tasks.push({ text: taskText, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function updateTaskStatusInStorage(taskText) {
    const tasks = getTasksFromStorage();
    const task = tasks.find(t => t.text === taskText);
    if (task) {
        task.completed = !task.completed;
    }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

function removeTaskFromStorage(taskText) {
    let tasks = getTasksFromStorage();
    tasks = tasks.filter(t => t.text !== taskText);
    localStorage.setItem('tasks', JSON.stringify(tasks));
}