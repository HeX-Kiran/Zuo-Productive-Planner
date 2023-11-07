// This page is to add task page funtionality

let taskDiv = document.querySelector(".tasks");

// currTask Obj
let currTask ;

taskDiv.addEventListener("click",e=>{
    // here event propagation happens and if the target element contains card class then open up the task page for that specific card

    if(e.target.classList.contains("card")){
        let card = e.target;

        let uuid = card.getAttribute("code");
        console.log(uuid);

        // find the taskObj from the array that matches the code
        newTasks.forEach(obj=>{
            if(obj.code == uuid) currTask = obj;
        })


        // open task page
        openTaskPage();

        // currTask contains the selected obj
        //update the info in the task page
        updateTaskPage(currTask);
    }
})


function updateTaskPage(currTask){
    // console.log(currTask);
    // if currTask is not empty then update the task page details
    if(currTask){
        let taskTitle = document.querySelector(".task-page-title p");
        let taskDesc = document.querySelector(".task-page-description p");
        let estimatedTime = document.querySelector(".task-estimated-time");
    
        taskTitle.textContent = currTask.taskTitle;
        taskDesc.textContent = currTask.taskDesc;
        estimatedTime.textContent = `${currTask.estimatedHr} hr  ${currTask.estimatedMin} min`;
    }
    else{
        console.log("CurrTask is empty");
    }
   

}

function openTaskPage(){
    document.querySelector(".task-page").style.display = "flex";
}

function closeTaskPage(){
    document.querySelector(".task-page").style.display = "none";
}


openTaskPage();