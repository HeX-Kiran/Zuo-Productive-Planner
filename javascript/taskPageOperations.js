// This file contains all the button actions in task Page
// DELETE BUTTON   / CLOSE BUTTON / START BUTTON / COMPLETE BUTTON

let startBtn  = document.querySelector(".started");
let taskCompleteBtn = document.querySelector(".completed");
let deleteBtn = document.querySelector(".delete");
let closeBtn = document.querySelector(".close");

// when start button is clicked pomodoro timer must start
startBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    // run the timer
    pomodoro();
});

// when complete button is clicked onTaskButton is clicked
taskCompleteBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    onCompleteTask();
    
})

// when delete button is clicked the selected task card should be deleted and task obj from array should also be removed
deleteBtn.addEventListener("click",(e)=>{
    e.preventDefault()
    currNode.remove();
    // now delete the task Obj from array
    newTasks.splice(currTaskIndex,1);
    closeTaskPage();
    
})

//when close button is clicked the timer should be cleared and task page should be closed
closeBtn.addEventListener("click",(e)=>{
    e.preventDefault();
    clearInterval(timer);
    closeTaskPage();
})
