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
    const date = new Date(todo.created_at);
    const dateString = date.toLocaleDateString();

    // Create a new li element
    const li = document.createElement("li");
    li.classList.add("todo-item");
    li.id = todo.created_at;
    li.setAttribute("onclick", `click_todo_item(${todo.created_at})`);

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
    todoName.textContent = todo.value;

    // Create the span element for due date
    const dueDate = document.createElement("span");
    dueDate.classList.add("due-date");
    dueDate.id = todo.created_at;
    dueDate.innerHTML =
      '<i class="fa-solid fa-calendar-days"></i> ' + dateString;

    // Create the div element for todo description
    const todoDesc = document.createElement("div");
    todoDesc.classList.add("todo-description");
    todoDesc.textContent = todo.value;

    // Append the todo data elements to the todo data div
    todoDataDiv.appendChild(todoName);

    if (todo.due) {
      todoDataDiv.appendChild(dueDate);
    }

    if (todo.desc) {
      todoDataDiv.appendChild(todoDesc);
    }

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

    if (todo.desc) {
      li.appendChild(expandBtn);
    }

    li.appendChild(deleteBtn);

    // Append the li element to the todoList
    todoList.appendChild(li);
  });
};

const add_into_array = (date) => {
  const todoList = document.getElementById("todo-list");
  const todo = document.getElementById("new-todo").value;

  // Create a new li element
  const li = document.createElement("li");
  li.classList.add("todo-item");
  li.id = date;
  li.setAttribute("onclick", `click_todo_item(${date})`);

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

  // Append the todo data elements to the todo data div
  todoDataDiv.appendChild(todoName);

  // Create the delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.classList.add("delete-btn", "btn");
  deleteBtn.setAttribute("onclick", "delete_main(event)");
  deleteBtn.innerHTML = '<i class="fa-solid fa-trash-can"></i>';

  // Append the checkbox, todo data div, expand button, and delete button to the li element
  li.appendChild(checkbox);
  li.appendChild(todoDataDiv);
  li.appendChild(deleteBtn);

  // Append the li element to the todoList
  todoList.appendChild(li);
};

const right_bar = (value) => {
  const todelete = document.getElementById("edit-todo");

  if (todelete) {
    todelete.remove();
  }

  const form = document.createElement("form");
  form.setAttribute("id", "edit-todo");
  form.classList.add("d-flex");
  form.onsubmit = function () {
    return false;
  };

  const title = document.createElement("h2");
  title.textContent = "Title";
  form.appendChild(title);

  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.value = value.value;
  form.appendChild(titleInput);

  const description = document.createElement("h2");
  description.textContent = "Description";
  form.appendChild(description);

  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.setAttribute("cols", "30");
  descriptionTextarea.setAttribute("rows", "10");
  form.appendChild(descriptionTextarea);

  console.log(value);

  const date = new Date(value.created_at).toLocaleDateString();
  const time = new Date(value.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dateCreated = document.createElement("span");
  dateCreated.classList.add("date-created");
  dateCreated.textContent = "Date created: " + date + ", " + time;
  form.appendChild(dateCreated);

  const dueDate = document.createElement("h2");
  dueDate.textContent = "Due Date";
  form.appendChild(dueDate);

  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  form.appendChild(dueDateInput);

  const btnGroup = document.createElement("div");
  btnGroup.classList.add("d-flex", "btn-group");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("btn-edit", "btn-delete");
  deleteButton.textContent = "Delete";
  deleteButton.setAttribute("onclick", `delete_right(${value.created_at})`);
  btnGroup.appendChild(deleteButton);

  const updateButton = document.createElement("button");
  updateButton.classList.add("btn-edit", "btn-update");
  updateButton.textContent = "Update";
  btnGroup.appendChild(updateButton);

  form.appendChild(btnGroup);

  const rightBar = document.getElementById("right-bar");
  rightBar.appendChild(form);
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

  // Remove the todo item from the array
  todo_arr = todo_arr.filter((todo) => todo.value !== pId);

  // Remove the li element from the DOM
  li.remove();

  // Update the local storage with the new todo_arr value
  localStorage.setItem("todos", JSON.stringify(todo_arr));

  if (todo_arr.length === 0) {
    if_empty_list();
  }

  console.log(todo_arr);
};

const delete_right = (id) => {
  const remove_right = document.getElementById("edit-todo");
  remove_right.remove();
  todo_arr = todo_arr.filter((todo) => todo.created_at !== id);
  localStorage.setItem("todos", JSON.stringify(todo_arr));

  const span = document.getElementById(id);
  const li = span.closest("li");
  li.remove();
};

document.addEventListener("DOMContentLoaded", function () {
  if (todo_arr.length === 0) {
    if_empty_list();
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
      const date = Date.now();
      todo_arr.push({ value: value, created_at: date });
      localStorage.setItem("todos", JSON.stringify(todo_arr));
      add_into_array(date);
      document.getElementById("new-todo").value = ""; // Clears the input field
    }

    console.log(todo_arr);
  });
});

const click_todo_item = (id) => {
  const index = todo_arr.findIndex((todo) => todo.created_at === id);
  right_bar(todo_arr[index]);
};

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
