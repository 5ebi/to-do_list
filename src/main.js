document.addEventListener('DOMContentLoaded', () => {
  const todoForm = document.querySelector('#todo-form');
  const todoInput = document.querySelector('#todo-input');
  const todoList = document.querySelector('#todo-list');

  // Load saved todos
  loadTodos();

  todoForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    addTodo(todoText);
    todoInput.value = '';
    saveTodos();
  });

  function addTodo(text) {
    const li = document.createElement('li');

    // Create todo text span
    const todoText = document.createElement('span');
    todoText.textContent = text;
    li.appendChild(todoText);

    // Create delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.classList.add('delete-btn');
    deleteBtn.addEventListener('click', () => {
      li.remove();
      saveTodos();
    });
    li.appendChild(deleteBtn);

    todoList.appendChild(li);
  }

  function saveTodos() {
    const todos = Array.from(todoList.querySelectorAll('li span')).map(
      (span) => span.textContent,
    );
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function loadTodos() {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      JSON.parse(savedTodos).forEach((todo) => addTodo(todo));
    }
  }
});
