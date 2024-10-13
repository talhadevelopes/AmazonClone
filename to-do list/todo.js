const todoList = JSON.parse(localStorage.getItem('todoList')) || [{
    name: 'Add a Todo', 
    dueDate: '2024-11-11'
}]; // Load saved todos from localStorage or use default if empty
renderTodoList();

document.querySelector('.js-add-todo-button').addEventListener('click', () => {
    addTodo();
})

function renderTodoList() {
    let todoListHTML = '';

    todoList.forEach((todoObject, index) => {

        // Destructure the name and dueDate from the object
        const { name, dueDate } = todoObject;

        // Create HTML for each todo item
        const html = `
            <div>${name}</div>
            <div>${dueDate}</div>
            <button class="delete-todo-button js-todo-delete-button">Delete</button>
        `;
        todoListHTML += html;
    });
    document.querySelector('.js-todo-list').innerHTML = todoListHTML; 

    document.querySelectorAll('.js-todo-delete-button').forEach((deleteButton, index) => {
        deleteButton.addEventListener('click', () => {
        
            todoList.splice(index, 1); 
        saveData();
        renderTodoList();
    })
    });

}

function addTodo() {
    const inputElement = document.querySelector('.js-name-input');
    const name = inputElement.value;

    const dateInputElement = document.querySelector('.js-due-date-input');
    const dueDate = dateInputElement.value;

    // Add new todo to the list
    todoList.push({ name, dueDate });

    // Clear input fields
    inputElement.value = '';
    dateInputElement.value = '';

    // Save updated todo list to localStorage
    saveData();

    // Re-render the updated todo list
    renderTodoList();
}

function deleteTodo(index) {
    // Remove the todo item from the list
    todoList.splice(index, 1);

    // Save updated todo list to localStorage
    saveData();

    // Re-render the todo list after deletion
    renderTodoList();
}

function saveData() {
    // Save the entire todoList array to localStorage as a string
    localStorage.setItem('todoList', JSON.stringify(todoList));
}
