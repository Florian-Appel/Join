/**
 * is used to store the id of the dragged element
 */
let currentDraggedElement;

/**
 * load the tasks from backend and render the tasks sorted by their status
 */
async function init() {
    await loadTasks()
    showTasks();
}

/**
 * clear the columns
 * display the classes sorted by their status
 */
function showTasks() {

    clearColumns();

    for (let i = 0; i < tasks.length; i++) {
        if (taskTodo(i)) {
            renderTodo(i);
        }
        else if (taskInProgress(i)) {
            renderInProgress(i);
        }
        else if (taskTesting(i)) {
            renderTesting(i);
        }
        else if (taskDone(i)) {
            renderDone(i);
        }
    }
}

/**
 * clear the columns where the tasks are displayed
 */
function clearColumns() {
    document.getElementById('todo__container').innerHTML = "";
    document.getElementById('inProgress__container').innerHTML = "";
    document.getElementById('testing__container').innerHTML = "";
    document.getElementById('done__container').innerHTML = "";
}

/**
 * check if the task at position i has the status todo
 * @param {Number} i the index of the for loop
 * @returns true or false
 */
function taskTodo(i) {
    return tasks[i]['status'] == 'todo';
}

/**
 * display the task in the todo column
 * @param {Number} i the index of the for loop
 */
function renderTodo(i) {
    document.getElementById('todo__container').innerHTML += `
    <div draggable="true" ondragstart="startDragging(${tasks[i]['id']})"  id="task${i}" class="backlogDetail__container background__lightblue" style="border-left:16px solid ${tasks[i]['personalColor'][0]}">
        <div class="left__container">
        <div class="img__container">
             <img src=${tasks[i]['img'][0]} alt="./img/user.png ">
        </div>
        <div class="assignedTo "title="${tasks[i]['assignedTo']}">
            <p id="name" >${tasks[i]['assignedTo'][0]}</p>
        </div>
    </div>
    <div class="category__container margin">
        <p>${tasks[i]['category']}</p>
    </div>
    <div class="details__container">
        <p>${tasks[i]['description']}</p>
     </div>
     `;
}

/**
 * check if the task at position i has the status inProgress
 * @param {Number} i the index of the for loop
 * @returns true or false
 */
function taskInProgress(i) {
    return tasks[i]['status'] == 'inProgress';
}

/**
 * display the task in the inProgress column
 * @param {Number} i the index of the for loop
 */
function renderInProgress(i) {
    document.getElementById('inProgress__container').innerHTML += `
    <div draggable="true" ondragstart="startDragging(${tasks[i]['id']})"  id="task${i}" class="backlogDetail__container background__lightblue" style="border-left:16px solid ${tasks[i]['personalColor'][0]}">
        <div class="left__container">
        <div class="img__container">
             <img src=${tasks[i]['img'][0]} alt="./img/user.png ">
        </div>
        <div class="assignedTo "title="${tasks[i]['assignedTo']}">
            <p id="name" >${tasks[i]['assignedTo'][0]}</p>
        </div>
    </div>
    <div class="category__container margin">
        <p>${tasks[i]['category']}</p>
    </div>
    <div class="details__container">
        <p>${tasks[i]['description']}</p>
     </div>
     `;
}

/**
 * check if the task at position i has the status testing
 * @param {Number} i the index of the for loop
 * @returns true or false
 */
function taskTesting(i) {
    return tasks[i]['status'] == 'testing';
}

/**
 * display the task in the testing column
 * @param {Number} i the index of the for loop
 */
function renderTesting(i) {
    document.getElementById('testing__container').innerHTML += `
    <div draggable="true" ondragstart="startDragging(${tasks[i]['id']})"  id="task${i}" class="backlogDetail__container background__lightblue" style="border-left:16px solid ${tasks[i]['personalColor'][0]}">
        <div class="left__container">
        <div class="img__container">
             <img src=${tasks[i]['img'][0]} alt="./img/user.png ">
        </div>
        <div class="assignedTo "title="${tasks[i]['assignedTo']}">
            <p id="name" >${tasks[i]['assignedTo'][0]}</p>
        </div>
    </div>
    <div class="category__container margin">
        <p>${tasks[i]['category']}</p>
    </div>
    <div class="details__container">
        <p>${tasks[i]['description']}</p>
     </div>
     `;
}

/**
 * check if the task at position i has the status done
 * @param {Number} i the index of the for loop
 * @returns true or false
 */
function taskDone(i) {
    return tasks[i]['status'] == 'done';
}

/**
 * display the task in the done column
 * @param {Number} i the index of the for loop
 */
function renderDone(i) {
    document.getElementById('done__container').innerHTML += `
    <div draggable="true" ondragstart="startDragging(${tasks[i]['id']})"  id="task${i}" class="backlogDetail__container background__lightblue" style="border-left:16px solid ${tasks[i]['personalColor'][0]}">
        <div class="left__container">
        <div class="img__container">
             <img src=${tasks[i]['img'][0]} alt="./img/user.png ">
        </div>
        <div class="assignedTo "title="${tasks[i]['assignedTo']}">
            <p id="name" >${tasks[i]['assignedTo'][0]}</p>
        </div>
    </div>
    <div class="category__container margin">
        <p>${tasks[i]['category']}</p>
    </div>
    <div class="details__container">
        <p>${tasks[i]['description']}</p>
     </div>
     `;
}

/**
 * on start dragging the id of the dragged element will be stored in
 * the variable currentDraggedElement
 * @param {Number} id 
 */
function startDragging(id) {
    currentDraggedElement = id;
}

/**
 * allows dropping in a div
 * @param {*} ev 
 */
function allowDrop(ev) {
    ev.preventDefault();
}

/**
 * changes the status of the task
 * @param {String} category in wich column the div is dropped
 */
async function moveTo(category) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i]['id'] == currentDraggedElement) {
            tasks[i]['status'] = category;
        }
    }
    await saveTasks();
    init();}