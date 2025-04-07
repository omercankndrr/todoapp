const form = document.querySelector("#todoAddForm");
const todoInput = document.querySelector("#todoName");
const todoList = document.querySelector("#todoList");
const clearAllButton = document.querySelector("#clearAllButton");
const deleteSelectedButton = document.querySelector("#deleteSelectedButton");

let todos = [];

document.addEventListener("DOMContentLoaded", loadTodos);
form.addEventListener("submit", addTodo);
clearAllButton.addEventListener("click", clearAllTodos);
deleteSelectedButton.addEventListener("click", deleteSelectedTodos);

function addTodo(e) {
    e.preventDefault();
    const inputText = todoInput.value.trim();

    if (inputText === "") {
        alert("Lütfen boş bırakmayınız!");
    } else {
        todos.push(inputText);
        saveTodosToStorage();
        renderTodos();
        todoInput.value = "";
    }
}

function saveTodosToStorage() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function loadTodos() {
    const storedTodos = JSON.parse(localStorage.getItem("todos"));
    if (storedTodos) {
        todos = storedTodos;
        renderTodos();
    }
}

function renderTodos() {
    todoList.innerHTML = "";

    todos.forEach((todo, index) => {
        const li = document.createElement("li");
        li.className = "todo-item d-flex justify-content-start align-items-center";
        li.innerHTML = `
            <input type="checkbox" class="todo-checkbox" data-index="${index}">
            ${todo}
        `;
        todoList.appendChild(li);
    });
}

function deleteSelectedTodos() {
    const checkboxes = document.querySelectorAll(".todo-checkbox");
    checkboxes.forEach(checkbox => {
        if (checkbox.checked) {
            const todoIndex = checkbox.getAttribute("data-index");
            todos.splice(todoIndex, 1);
        }
    });

    saveTodosToStorage();
    renderTodos();
}

function clearAllTodos() {
    todos = [];
    saveTodosToStorage();
    renderTodos();
}
