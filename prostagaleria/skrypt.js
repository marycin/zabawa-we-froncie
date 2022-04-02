let leftButton = document.getElementById('left')
let rightButton = document.getElementById('right')
let radioButtons = document.getElementsByClassName('radiobuttons')
let background = document.getElementById('slider')
var pointer=1

function setBackground(){
    background.style.backgroundImage = "url('pics/pic"+pointer+".jpg')"
    for(var i=0;i<radioButtons.length;i++){
        if(i == pointer-1){
            radioButtons[i].checked = true
        }
        else{
            radioButtons[i].checked = false
        }  
    }
}


console.log(radioButtons[pointer].checked)

leftButton.addEventListener('click', ()=>{
    if(pointer != 1){
        pointer--
        console.log(pointer)
    }
    else{
        pointer = 4
    }
    setBackground()

   
})
rightButton.addEventListener('click',()=>{
    if(pointer != 4){
        pointer++
        console.log(pointer)
    }
    else{
        pointer = 1
    }
    setBackground()
})

const myTimeout = setInterval(()=>{
    if(pointer != 4){
        pointer++
        console.log(pointer)
    }
    else{
        pointer = 1
    }
    setBackground()
}, 3000);

