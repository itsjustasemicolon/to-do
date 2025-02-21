let todos = [];
const todoList = document.getElementById('todoList');
const input = document.querySelector('input');
const stats = document.querySelector('.stats');
const clearButton = document.querySelector('.clear-button');


function loadTodos() {
    const savedTodos = localStorage.getItem('ascii-todos');
    if (savedTodos) {
        todos = JSON.parse(savedTodos);
        renderTodos();
    }
}

function saveTodos() {
    localStorage.setItem('ascii-todos', JSON.stringify(todos));
}

function renderTodos() {
    todoList.innerHTML = todos.map((todo, index) =>
        `<div class="todo-item" data-index="${index}">
          [${todo.completed ? 'x' : ' '}] ${todo.text}
          <button class="delete-button" data-index="${index}">[x]</button>
        </div>`
    ).join('');

    const completed = todos.filter(t => t.completed).length;
    stats.textContent = `${completed}/${todos.length} tasks completed`;
    saveTodos();
}

function addTodo() {
    const text = input.value.trim();
    if (text) {
        todos.push({ text, completed: false });
        input.value = '';
        renderTodos();
    }
}

input.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        addTodo();
    }
});

todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-button')) {
        const index = parseInt(e.target.dataset.index);
        todos.splice(index, 1);
        renderTodos();
        return;
    }

    const item = e.target.closest('.todo-item');
    if (item) {
        const index = parseInt(item.dataset.index);
        todos[index].completed = !todos[index].completed;
        renderTodos();
    }
});

clearButton.addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all tasks?')) {
        todos = [];
        renderTodos();
    }
});

loadTodos();