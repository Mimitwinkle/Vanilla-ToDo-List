// Selectors

const todoInput = document.querySelector('.todo-input');
const todoButton = document.querySelector('.todo-button');
const todoList = document.querySelector('.todo-list');
const filterOption = document.querySelector('.filter-todo');

// Event Listeners

document.addEventListener('DOMContentLoaded', getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', editCheck);
filterOption.addEventListener('click', filterTodo);

// Functions

function addTodo(event) {
      // Prevent form from submitting
    event.preventDefault();
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todoInput.value;
    newTodo.classList. add('todo-item');
    todoDiv.appendChild(newTodo);

    // Add todo to localStorage
    saveLocalTodos(todoInput.value);

    // Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);

    // Clear todo input value
    todoInput.value = "";
}

function editCheck(e) {
  const item = e.target;
  // delete todo
  if(item.classList[0] === 'trash-btn') {
    const todo = item.parentElement;
    // Animation
    todo.classList.add('fall');
    todo.addEventListener('transitionEnd', function(){
      todo.remove();
    })
    removeLocalTodos(todo);
    //todo.remove();
  }
  // mark todo as complete
  if(item.classList[0] === 'complete-btn') {
    const todo = item.parentElement;
    todo.classList.toggle('completed');
  }
}


function filterTodo(e) {
  const todos = todoList.childNodes;
  todos.forEach(function (todo) { 
      const mStyle = todo.style;  
      if(mStyle != undefined && mStyle != null){
          switch (e.target.value) {
              case "all":
                  mStyle.display = "flex";
                  break;
              case "completed":
                  if (todo.classList.contains('completed')) {
                      mStyle.display = 'flex';
                  } else {
                      mStyle.display = "none";
                  }
                  break;
              case "uncompleted":
                  if (todo.classList.contains('completed')){
                      mStyle.display = 'none';
                  }
                  else{
                      mStyle.display = "flex";
                  }
                  break;
          }
      }
  })
}

function saveLocalTodos(todo) {
  // Check if there are already todos in localStorage
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.push(todo);
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getTodos() {
  // Check if there are already todos in localStorage
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  todos.forEach(function(todo){
    // Todo DIV
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    // Create LI
    const newTodo = document.createElement('li');
    newTodo.innerText = todo;
    newTodo.classList. add('todo-item');
    todoDiv.appendChild(newTodo);

    // Checkmark button
    const completedButton = document.createElement('button');
    completedButton.innerHTML = '<i class="fas fa-check"></i>';
    completedButton.classList.add('complete-btn');
    todoDiv.appendChild(completedButton);
    // Trash button
    const trashButton = document.createElement('button');
    trashButton.innerHTML = '<i class="fas fa-trash"></i>';
    trashButton.classList.add('trash-btn');
    todoDiv.appendChild(trashButton);
    // Append to list
    todoList.appendChild(todoDiv);
  })
}

function removeLocalTodos(todo) {
  // Check if there are already todos in localStorage
  let todos;
  if(localStorage.getItem('todos') === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem('todos'));
  }
  const todoIndex = todo.children[0].innerText;
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem('todos', JSON.stringify(todos));
}

// TODO: save "checked" status

// TODO: when a todo is deleted, make sure any todos below are bumped up