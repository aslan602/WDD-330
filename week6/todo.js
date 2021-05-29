class Task  {
    constructor(id, checked, description) {
        this.id = id;
        this.taskdone = checked;
        this.description = description;
    }   
};

/* Start the Page */
checkStorage();
let tasks = [];
const formInput = document.querySelector(".taskform");
const taskInput = document.querySelector(".inputtask");
const tasklist = document.querySelector(".taskelement");



/* This creates a new element. */
function createNewTask() {    
    let description = document.getElementById("gettask").value;
    if (description == "") {
        description = null;
        displayError();
    }
    else {
        const task = new Task(Date.now(), false, description);
        tasks.push(task);    
        saveLocalStorage(tasks);
        document.getElementById("gettask").value = ""; 
    }
     
};

/* This function displays the localStorage list */
function listtask(tasks) {
    document.getElementById("display").innerHTML = "";    
    for (let i = 0; i < tasks.length; i++) {
        const checked = tasks[i].taskdone ? 'checked': null;
        const li = document.createElement("li");
        li.setAttribute("class", "task");
        li.setAttribute("id-key", tasks[i].id);
        if (tasks[i].taskdone == true) {
            li.classList.add("checked");
        }
        li.innerHTML = `<input type='checkbox' class='checkbox' ${checked}> ${tasks[i].description} <button class='deletebutton'>X</button>`;      
        tasklist.append(li);
        counttasks();        
    }           
};

/* Save the list to localStorage */
function saveLocalStorage(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    listtask(tasks);
};

/* Load the list from localStorage */
function loadLocalStorage() {
    const loaded = localStorage.getItem("tasks");
    if (loaded) {
        tasks = JSON.parse(loaded);
        listtask(tasks);
    }
};

function alltasks() {    
    listtask(tasks);    
};

function complete() {
    completetasks = tasks.filter(function(task) {
        return task.taskdone == true;
    })    
    listtask(completetasks);
}

function active() {
    completetasks = tasks.filter(function(task) {
        return task.taskdone != true;
    })    
    listtask(completetasks);   
}

tasklist.addEventListener("click", function(event) {
    if (event.target.type == "checkbox") {
        toggle(event.target.parentElement.getAttribute("id-key"));
    }

    if (event.target.classList.contains('deletebutton')) {
        deleteTodo(event.target.parentElement.getAttribute("id-key"));
    }

    counttasks();
});

/* Make sure the browser supports storage */
function checkStorage() {
    if (typeof(Storage) !== "undefined") {     
        console.log("You can use localStorage!");
        return true;
    }
    else {
        document.getElementById("display").innerHTML = "Sorry, your browser does not support Web Storage...";
        console.log("Browser does not support LocalStorage!!!");
        return false;         
    }   
};

function displayError() {
    console.log("User did not enter anything in the input field.");
    alert("You must put something in the input field.");
    listtask(tasks);
};

function toggle(id) {
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id == id) {
           tasks[i].taskdone = !tasks[i].taskdone;
        }
    }
    saveLocalStorage(tasks);
};

function deleteTodo(id) {
    tasks = tasks.filter(function(task) {
        return task.id != id;
    })
    saveLocalStorage(tasks);
};

function counttasks() {
    let firstcount = 0;
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].taskdone == false) {
            firstcount++;
        }
    }
    document.getElementById("info").innerHTML = firstcount + " tasks left";
};

loadLocalStorage();
counttasks();








