let tasks = document.getElementById('tasks-area');
let showTaskButton = document.getElementById('show-button')
let addTaskButton = document.getElementById('taskAddButton')


let taskAdder = document.getElementById('task-adder')

let taskTitle = document.getElementById('inputTitle')
let taskDate = document.getElementById('taskDate')
let taskType = document.getElementById("typeOfToDo")
let taskPriority = document.getElementById("typeOfPriority")

let counter = 1

tasks.innerHTML += "<div class='task' id='row"+counter+"'>\
<div class='task-left'>\
    <input type='checkbox'>\
    <div class='task-description'>\
        <h3>Sample task</h3>  \
        <p>Priority: </p> \
        <p>Type:  </p> \
        <p>Date: </p> \
    </div> \
</div>\
<div class='task-right'>\
    <button id='delete-task"+counter+"' class='delete-task' onclick='remove(this)' >DEL</button>\
</div>\
</div>"

function addItem(){
    let titleToAdd = taskTitle.value
    let dateToAdd = taskDate.value
    let typeToAdd = taskType.value
    let priorityToAdd = taskPriority.value

    if(titleToAdd !== "" && dateToAdd !=="" && typeToAdd !=="None" && priorityToAdd !=="None"){
        counter++
        tasks.innerHTML += "<div class='task' id='row"+counter+"'>\
        <div class='task-left'>\
            <input type='checkbox'>\
            <div class='task-description'>\
                <h3>"+titleToAdd+"</h3>  \
                <p>Priority: "+priorityToAdd+"</p> \
                <p>Type: "+typeToAdd+" </p> \
                <p>Date: "+dateToAdd+"</p> \
            </div> \
        </div>\
        <div class='task-right'>\
            <button id='delete-task"+counter+"' class='delete-task' onclick='remove(this)' >DEL</button>\
        </div>\
        </div>"

        taskTitle.value =""
        taskType.value = "None"
        taskPriority.value = "None"
        taskAdder.style.display = "none"
        
    }
    else{
        console.log("cos nie tak")
    }
}

function openOrShowTaskAdder(){
    
    if(taskAdder.style.display ==="flex"){
        taskAdder.style.display = "none"
    }
    else{
        taskAdder.style.display ="flex"
    }
}

function remove(button){
    let number = button.id.toString();
    let row = document.getElementById('row'+number[number.length-1])
    row.remove()
}

showTaskButton.addEventListener('click',openOrShowTaskAdder);

addTaskButton.addEventListener('click',addItem);