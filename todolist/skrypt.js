
let tasks = document.getElementById('tasks-area');
let showTaskButton = document.getElementById('show-button')
let addTaskButton = document.getElementById('taskAddButton')


let taskAdder = document.getElementById('task-adder')

let taskTitle = document.getElementById('inputTitle')
let taskDate = document.getElementById('taskDate')
let taskType = document.getElementById("typeOfToDo")
let taskPriority = document.getElementById("typeOfPriority")





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
        divDesc.innerHTML = '<h3>' + titleToAdd +
        '</h3><p>Priority:' + 
        priorityToAdd +'</p> ' +
        '<p>Type: ' + typeToAdd + 
        '</p><p>Date: ' + dateToAdd + '</p>'
        
        //data i typ do dodania w html
        let divRightSide = document.createElement('div')
        divRightSide.classList.add('task-right')
        let buttonRightSide = document.createElement('button')
        buttonRightSide.classList.add('delete-task')
        buttonRightSide.innerHTML = 'DEL' 
        buttonRightSide.addEventListener('click',deleteTask)
        //przypisuje sie do nieistniejacych taskow addeventlistener
        //parent w dol, a nie child w gore
        
        divLeftSide.appendChild(checkboxToAdd)
        divLeftSide.appendChild(divDesc)
    
        divRightSide.appendChild(buttonRightSide)
    
        elementToAdd.appendChild(divLeftSide)
        elementToAdd.appendChild(divRightSide)
        
        tasks.appendChild(elementToAdd)

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

showTaskButton.addEventListener('click',openOrShowTaskAdder);

addTaskButton.addEventListener('click',addItem);

const deleteTask = ()=>{
    let deleteTaskButtons = document.querySelectorAll('.delete-task')
    tasks = document.getElementById('tasks-area');
    console.log(deleteTaskButtons.length)
    Array.from(deleteTaskButtons).forEach((element)=>{
        element.addEventListener('click',()=>{
            console.log('top')
            tasks.removeChild(element.parentNode.parentElement);
        })
    })
}
deleteTask();
