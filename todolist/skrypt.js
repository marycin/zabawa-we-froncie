console.log("gitens");

let tasks = document.getElementById('tasks-area');
let showTaskButton = document.getElementById('show-button')
let addTaskButton = document.getElementById('taskAddButton')

let taskAdder = document.getElementById('task-adder')

let taskTitle = document.getElementById('inputTitle')
let taskDate = document.getElementById('taskDate')
let taskType = document.getElementById("typeOfToDo")
let taskPriority = document.getElementById("typeOfPriority")

console.log(tasks.children[0])

function addItem(){
    let titleToAdd = taskTitle.value
    let dateToAdd = taskDate.value
    let typeToAdd = taskType.value
    let priorityToAdd = taskPriority.value

    if(titleToAdd !== "" && dateToAdd !=="" && typeToAdd !=="None" && priorityToAdd !=="None"){
        let elementToAdd = document.createElement("div")
        elementToAdd.classList.add('task')
    
        let divLeftSide = document.createElement('div')
        divLeftSide.classList.add('task-left')
        let checkboxToAdd = document.createElement('input')
        checkboxToAdd.type = 'checkbox';
        let divDesc = document.createElement('div')
        divDesc.classList.add('task-description')
        divDesc.innerHTML = '<h3>' + titleToAdd +'</h3><p>Priority:' + priorityToAdd +'</p> '
        
        //data i typ do dodania w html
        let divRightSide = document.createElement('div')
        divRightSide.classList.add('task-right')
        let buttonRightSide = document.createElement('button')
        buttonRightSide.classList.add('delete-task')
        buttonRightSide.innerHTML = 'DEL' 
        
        divLeftSide.appendChild(checkboxToAdd)
        divLeftSide.appendChild(divDesc)
    
        divRightSide.appendChild(buttonRightSide)
    
        elementToAdd.appendChild(divLeftSide)
        elementToAdd.appendChild(divRightSide)
        
        tasks.appendChild(elementToAdd)

        taskTitle.value =""
        taskType.value = "None"
        taskPriority.value = "None"
    }
    else{
        console.log("cos nie tak")
    }
    

    
}

function openTaskAdder(){
    if(taskAdder.style.display ==="flex"){
        taskAdder.style.display = "none"
    }
    else{
        taskAdder.style.display ="flex"
    }
}

showTaskButton.addEventListener('click',openTaskAdder);

addTaskButton.addEventListener('click',addItem);