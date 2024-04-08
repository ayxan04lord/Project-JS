document.addEventListener("DOMContentLoaded", function () {
    let SORT_DIRECTION = "ASC";
    const MAX_TASKS = 5;
    const TODO_LIST = document.querySelector("#todo_list");
    const TODO_ADD_BUTTON = document.querySelector("#todo_add");
    const TODO_SORT_BTN = document.querySelector("#todo-sort");

    /**
     * @param {HTMLUListElement} collectionBlock 
     */
    function addNewTask(collectionBlock) {
        const existingTaskInputs = collectionBlock.querySelectorAll(".todo__item-input");
        let isEmptyField = false;
        existingTaskInputs.forEach(input => {
            if (input.value.trim() === "") {
                isEmptyField = true;
                return;
            }
        });
        if (!isEmptyField) {
            const taskInput = document.createElement("input");
            taskInput.classList.add("todo__item-input");
            taskInput.type = "text";
            taskInput.name = "backend_name[]";
            taskInput.placeholder = "Please enter todo item";
            const removeButton = document.createElement("i");
            removeButton.classList.add("fa-solid", "fa-xmark");
            const taskItem = document.createElement("div");
            taskItem.classList.add("todo__item");
            taskItem.appendChild(taskInput);
            taskItem.appendChild(removeButton);
            collectionBlock.appendChild(taskItem);
        } else {
            Swal.fire({
                "title": "Info",
                "icon": "info",
                "confirmButtonText": "Okey!",
                "text": "Please fill in the existing empty todo item first."
            });
        }
    }

    TODO_ADD_BUTTON.addEventListener("click", function () {
        if (TODO_LIST.children.length < MAX_TASKS) {
            addNewTask(TODO_LIST);
        }
        else {
            Swal.fire({
                "title": "Info",
                "icon": "info",
                "confirmButtonText": "Okey!",
                "text": "You can\'t add more than 5 tasks."
            });
        }
    });

    TODO_LIST.addEventListener("click", function (event) {
        if (event.target.classList.contains("fa-xmark")) {
            const taskItem = event.target.parentElement;
            if (TODO_LIST.children.length > 1) {
                taskItem.remove();
            }
        }
    });

    TODO_SORT_BTN.addEventListener("click", function () {
        const emptyInputs = Array.from(TODO_LIST.querySelectorAll('.todo__item-input')).filter(
            input => input.value.trim() === "");
        emptyInputs.forEach(emptyInputs => emptyInputs.parentElement.remove());
        const taskList = Array.from(TODO_LIST.children);
        taskList.sort((a, b) => {
            const textA = a.querySelector(".todo__item-input").value.toUpperCase();
            const textB = b.querySelector(".todo__item-input").value.toUpperCase();
            return SORT_DIRECTION.toUpperCase() === "ASC" ? textA.localeCompare(textB) : textB.localeCompare(textA);
        });
        TODO_LIST.innerHTML = "";
        taskList.forEach(task => TODO_LIST.appendChild(task))
        SORT_DIRECTION = (SORT_DIRECTION.toUpperCase() === "ASC" ? "DESC" : "ASC");
    });
});