let todo_arr = [];

// Get the todo_arr from local storage
const savedTodos = JSON.parse(localStorage.getItem("todos"));

// Check if savedTodos is not null
if (savedTodos) {
  todo_arr = savedTodos;
}

const loop_array = () => {
  const todoList = document.getElementById("todo-list");

  // Loop through the todo_arr array
  todo_arr.forEach(function (todo) {
    // Create a new li element
    const li = document.createElement("li");
    li.classList.add("todo-item");

    // Create the checkbox element
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "todo-check";

    // Create the div for todo data
    const todoDataDiv = document.createElement("div");
    todoDataDiv.classList.add("todo-data");

    // Create the paragraph element for todo name
    const todoName = document.createElement("p");
    todoName.id = "todo-name";
    todoName.textContent = todo;

    // Create the span element for due date
    const dueDate = document.createElement("span");
    dueDate.classList.add("due-date");
    dueDate.innerHTML = '<i class="fa-solid fa-calendar-days"></i> 24/3/2023';

    // Create the div element for todo description
    const todoDesc = document.createElement("div");
    todoDesc.classList.add("todo-description");
    todoDesc.textContent = todo;

    // Append the todo data elements to the todo data div
    todoDataDiv.appendChild(todoName);
    todoDataDiv.appendChild(dueDate);
    todoDataDiv.appendChild(todoDesc);

    // Create the expand todo button
    const expandBtn = document.createElement("button");
    expandBtn.classList.add("expand-todo", "btn");
    expandBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';

    // Create the delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.classList.add("delete-btn", "btn");
    deleteBtn.id = "delete-btn-main";
    deleteBtn.setAttribute("onclick", "delete_main(event)");
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

    // Append the checkbox, todo data div, expand button, and delete button to the li element
    li.appendChild(checkbox);
    li.appendChild(todoDataDiv);
    li.appendChild(expandBtn);
    li.appendChild(deleteBtn);

    // Append the li element to the todoList
    todoList.appendChild(li);
  });
};

const add_into_array = () => {
  const todoList = document.getElementById("todo-list");

  const todo = document.getElementById("new-todo").value;

  // Create a new li element
  const li = document.createElement("li");
  li.classList.add("todo-item");

  // Create the checkbox element
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.id = "todo-check";

  // Create the div for todo data
  const todoDataDiv = document.createElement("div");
  todoDataDiv.classList.add("todo-data");

  // Create the paragraph element for todo name
  const todoName = document.createElement("p");
  todoName.id = "todo-name";
  todoName.textContent = todo;

  // Create the span element for due date
  const dueDate = document.createElement("span");
  dueDate.classList.add("due-date");
  dueDate.innerHTML = '<i class="fa-solid fa-calendar-days"></i> 24/3/2023';

  // Create the div element for todo description
  const todoDesc = document.createElement("div");
  todoDesc.classList.add("todo-description");

  todoDesc.textContent = todo;

  // Append the todo data elements to the todo data div
  todoDataDiv.appendChild(todoName);
  todoDataDiv.appendChild(dueDate);
  todoDataDiv.appendChild(todoDesc);

  // Create the expand todo button
  const expandBtn = document.createElement("button");
  expandBtn.classList.add("expand-todo", "btn");
  expandBtn.innerHTML = '<i class="fa-solid fa-chevron-down"></i>';

  // Create the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "btn");
  deleteBtn.setAttribute("onclick", "delete_main(event)");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Append the checkbox, todo data div, expand button, and delete button to the li element
  li.appendChild(checkbox);
  li.appendChild(todoDataDiv);
  li.appendChild(expandBtn);
  li.appendChild(deleteBtn);

  // Append the li element to the todoList
  todoList.appendChild(li);
};

const if_empty_list = () => {
  // Create a new li element
  const li = document.createElement("li");
  li.classList.add("d-flex", "mb");
  li.id = "empty-list";

  // Set the innerHTML of the li element to the desired HTML code
  li.innerHTML = '<div class="mt no-data">Empty Data</div>';

  // Append the li element to the UL element
  const ul = document.getElementById("todo-list");
  ul.appendChild(li);
};

// delete task in todo list
const delete_main = (event) => {
  const deleteBtn = event.target; // Get the delete button that was clicked
  const li = deleteBtn.closest("li"); // Get the parent li element
  const p = li.querySelector("#todo-name"); // Get the p element with id todo-name inside the li
  const pId = p.innerHTML; // Get the value of the p element
  console.log(pId);
  // Remove the todo item from the array
  todo_arr = todo_arr.filter((todo) => todo !== pId);

  // Remove the li element from the DOM
  li.remove();

  // Update the local storage with the new todo_arr value
  localStorage.setItem("todos", JSON.stringify(todo_arr));

  if (todo_arr.length === 0) {
    if_empty_list();
  }
};

document.addEventListener("DOMContentLoaded", function () {
  if (todo_arr.length === 0) {
    if_empty_list();
    console.log("hello");
  } else {
    // loop the entire list in array
    loop_array();
  }

  // add task into to-do list
  const addTodo = document.getElementById("add-todo-form");
  addTodo.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevents the form from reloading
    const value = document.getElementById("new-todo").value;

    if (todo_arr.length === 0) {
      const toRemove = document.getElementById("empty-list");
      toRemove.remove();
    }

    if (value.trim()) {
      todo_arr.push(value);
      localStorage.setItem("todos", JSON.stringify(todo_arr));
      add_into_array();
      document.getElementById("new-todo").value = ""; // Clears the input field
    }

    console.log(todo_arr);
  });
});

const pushfunction = () => {
  const el = document.getElementById("render_element");
  const input = document.getElementById("value").value;
  if (input.trim()) {
    a.push(input);
  }
  console.log(a);

  var divElement = document.createElement("div");
  divElement.innerText = input;
  el.appendChild(divElement);

  var deleteButton = document.createElement("button");
  deleteButton.innerHTML = "delete";
  divElement.appendChild(deleteButton);

  deleteButton.addEventListener("click", function () {
    divElement.remove();

    console.log(a);
    const indexOfElement = a.indexOf(input);
    console.log(indexOfElement, "index");
    a.splice(indexOfElement, 1);
    console.log(a);
  });
};
