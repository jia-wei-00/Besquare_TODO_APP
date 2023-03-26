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
    checkbox.setAttribute("onclick", `done(${todo.created_at})`);
    checkbox.value = todo.done;
    checkbox.checked = todo.done;

    // Create the div for todo data
    const todoDataDiv = document.createElement("div");
    todoDataDiv.classList.add("todo-data");
    todoDataDiv.id = "todo-data";

    // Create the paragraph element for todo name
    const todoName = document.createElement("p");
    todoName.id = "todo-name";
    todoName.textContent = todo.value;

    // Create the span element for due date
    const dueDate = document.createElement("span");
    dueDate.classList.add("due-date");
    dueDate.id = todo.created_at;
    dueDate.innerHTML =
      '<i class="fa-solid fa-calendar-days"></i> ' + todo.dueDate;

    // Append the todo data elements to the todo data div
    todoDataDiv.appendChild(todoName);

    if (todo.dueDate) {
      todoDataDiv.appendChild(dueDate);
    }

    // Create the expand todo button
    const expandBtn = document.createElement("button");
    expandBtn.classList.add("expand-todo", "btn");
    expandBtn.setAttribute("onclick", `click_expand(${todo.created_at})`);
    expandBtn.innerHTML = '<i id="icon" class="fa-solid fa-chevron-down"></i>';

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
  checkbox.setAttribute("onclick", `done(${date})`);
  checkbox.value = false;
  checkbox.checked = false;

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

  const div = document.createElement("right_form");
  div.setAttribute("id", "edit-todo");
  div.classList.add("d-flex", ".form");

  const title = document.createElement("h2");
  title.textContent = "Title";
  div.appendChild(title);

  const titleInput = document.createElement("input");
  titleInput.setAttribute("type", "text");
  titleInput.value = value.value;
  titleInput.id = "title-value";
  div.appendChild(titleInput);

  const description = document.createElement("h2");
  description.textContent = "Description";
  div.appendChild(description);

  const descriptionTextarea = document.createElement("textarea");
  descriptionTextarea.setAttribute("cols", "30");
  descriptionTextarea.setAttribute("rows", "10");
  descriptionTextarea.id = "desc-value";

  if (value.desc) {
    descriptionTextarea.value = value.desc;
  }
  div.appendChild(descriptionTextarea);

  const date = new Date(value.created_at).toLocaleDateString();
  const time = new Date(value.created_at).toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const dateCreated = document.createElement("span");
  dateCreated.classList.add("date-created");
  dateCreated.textContent = "Date created: " + date + ", " + time;
  div.appendChild(dateCreated);

  const dueDate = document.createElement("h2");
  dueDate.textContent = "Due Date";
  div.appendChild(dueDate);

  const dueDateInput = document.createElement("input");
  dueDateInput.setAttribute("type", "date");
  dueDateInput.id = "due-value";
  dueDateInput.value = value.dueDate;
  div.appendChild(dueDateInput);

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
  updateButton.setAttribute("onclick", `update_func(${value.created_at})`);
  btnGroup.appendChild(updateButton);

  div.appendChild(btnGroup);

  const rightBar = document.getElementById("right-bar");
  rightBar.appendChild(div);
};

const empty_search = () => {
  const ul = document.getElementById("result-box");
  const li = document.createElement("li");
  li.className = "d-flex mb";
  const div = document.createElement("div");
  div.className = "mt no-data";
  div.textContent = "Empty Data";
  li.appendChild(div);
  ul.appendChild(li);
};

const search_result_func = (value) => {
  const ul = document.getElementById("result-box");

  const li = document.createElement("li");
  li.className = "d-flex result mb";

  const div = document.createElement("div");
  div.id = "result-count";
  div.className = "mt";
  div.textContent = `Showing: ${value.length} result`;

  li.appendChild(div);
  ul.appendChild(li);

  value.forEach((result) => {
    const li = document.createElement("li");
    li.className = "d-flex result mb";

    const div = document.createElement("div");
    div.id = "result-list";

    const date = new Date(result.created_at).toLocaleDateString();
    const time = new Date(result.created_at).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });

    const span = document.createElement("span");
    span.className = "search-date";
    span.textContent = `${date + " " + time}`;

    div.textContent = result.value;
    div.appendChild(span);

    li.appendChild(div);
    ul.appendChild(li);
  });
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

const update_func = (id) => {
  const title = document.getElementById("title-value").value;
  const desc = document.getElementById("desc-value").value;
  const due = document.getElementById("due-value").value;

  const index = todo_arr.findIndex((todo) => todo.created_at === id);

  if (index !== -1) {
    todo_arr[index] = {
      ...todo_arr[index], // keep existing properties
      value: title, // update value property
      desc: desc, // add new desc property
      dueDate: due, // add new dueDate property
    };
    localStorage.setItem("todos", JSON.stringify(todo_arr));
  }

  const todoList = document.getElementById("todo-list");
  todoList.innerHTML = "";
  loop_array();
};

const done = (id) => {
  const index = todo_arr.findIndex((todo) => todo.created_at === id);
  const li = document.getElementById(id);
  const checkbox = li.querySelector("#todo-check");

  if (index !== -1) {
    if (checkbox.checked) {
      // do something when checkbox is checked
      todo_arr[index] = {
        ...todo_arr[index], // keep existing properties
        done: true, // update value checkbox
      };
    } else {
      // do something when checkbox is unchecked
      todo_arr[index] = {
        ...todo_arr[index], // keep existing properties
        done: false, // update value checkbox
      };
    }

    localStorage.setItem("todos", JSON.stringify(todo_arr));
    console.log(todo_arr);
  }
};

document.addEventListener("DOMContentLoaded", function () {
  if (todo_arr.length === 0) {
    if_empty_list();
  } else {
    // loop the entire list in array
    loop_array();
  }

  // search box function
  const search_form = document.getElementById("search-form");
  search_form.addEventListener("submit", function (event) {
    event.preventDefault();

    const search_input = document.getElementById("search-input").value;

    if (search_input.trim()) {
      const search_result = todo_arr.filter((todo) => {
        return todo.value.toLowerCase().includes(search_input.toLowerCase());
      });

      const result_box = document.getElementById("result-box");
      result_box.innerHTML = "";

      if (search_result.length === 0) {
        empty_search();
      } else {
        search_result_func(search_result);
      }
    } else {
      const result_box = document.getElementById("result-box");
      result_box.innerHTML = "";
      empty_search();
    }
  });

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
  });
});

const click_todo_item = (id) => {
  const index = todo_arr.findIndex((todo) => todo.created_at === id);
  right_bar(todo_arr[index]);
};

const click_expand = (id) => {
  const index = todo_arr.findIndex((todo) => todo.created_at === id);
  right_bar(todo_arr[index]);

  // Create the div element for todo description
  const task = document.getElementById(id);

  const check_exists = task.querySelector(".todo-description");

  if (!check_exists) {
    const todo_data = task.querySelector(".todo-data");
    const todoDesc = document.createElement("div");
    todoDesc.classList.add("todo-description");
    todoDesc.textContent = todo_arr[index].desc;
    todo_data.appendChild(todoDesc);
  } else {
    check_exists.remove();
  }

  const find_button = task.querySelector(".expand-todo");
  const icon = find_button.querySelector("i");
  if (icon.classList.contains("fa-chevron-down")) {
    icon.classList.replace("fa-chevron-down", "fa-chevron-up");
  } else {
    icon.classList.replace("fa-chevron-up", "fa-chevron-down");
  }
};
