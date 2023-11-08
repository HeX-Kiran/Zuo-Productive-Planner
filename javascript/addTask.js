// This file is to create new Task 

let addTask = document.querySelector(".add-task");
let saveBtn = document.querySelector(".save");
let formClose = document.querySelector(".form-close");



// when add-task button is clicked
addTask.addEventListener("click",(e)=>{
    // open modal Box
    openModalBox();

});

// when modal Box is opened and save button is clicked
saveBtn.addEventListener("click",e=>{

    // When save button is click ,get all details from input field and verfiy it
    getInput();

    // after saving clear input fields
    clearInputFields();
})

// when modal box close button is clicked
formClose.addEventListener("click",()=>{
    // while closing all the input fields should be empty
    clearInputFields();

    // close modal box
    closeModalBox();
})







function getInput(){
    let taskTitle = document.querySelector(".task-title").value;
    let taskDesc = document.querySelector(".modal-task-desc").value;
    let estimatedHr = document.querySelector(".task-hour").value;
    let estimatedMin = document.querySelector(".task-min").value;
    let focusTime = document.querySelector(".focus-time").value;
    let breakTime = document.querySelector(".break-time").value;

    // Pass the above input field values into the verifier
    if(inputVerifier(taskTitle,taskDesc,estimatedHr,estimatedMin,focusTime,breakTime)){
        // if all cases are passed then create an task object
        let estimatedHour = estimatedHr == "" ? 0 : Number(estimatedHr);
        let estimatedMinute = estimatedMin == "" ? 0 : Number(estimatedMin);
        const taskObj = new createTaskObject(taskTitle,taskDesc,estimatedHour,estimatedMinute,Number(focusTime),Number(breakTime));

        // add task object in array
        newTasks.push(taskObj);

        // add newly created task object in ui
        renderTask(taskObj);

        // close modal  box
        closeModalBox();
    }
    

    
}

//function to verify the input fields
function inputVerifier(taskTitle,taskDesc,estimatedHr,estimatedMin,focusTime,breakTime){
    // if any of the argument doesnt pass the verifier then return false;
    // if all the arugement pass the verifier then only create an object and add it in array
    
    // check if tasktitle is empty show pop up
    if(taskTitle == ""){
        document.querySelector(".empty-title").style.display = "block";
        setTimeout(()=>{document.querySelector(".empty-title").style.display = "none";},3000)
        return false;
    }
    
    // check if task description is empty show pop up
    if(taskDesc == ""){
        document.querySelector(".empty-desc").style.display = "block";
        setTimeout(()=>{document.querySelector(".empty-desc").style.display = "none";},3000)
        return false;
    }

    // check if estimated time ie both hr and min is empty
    if(estimatedHr == "" && estimatedMin == ""){
        document.querySelector(".empty-estimatedTime").style.display = "block";
        setTimeout(()=>{document.querySelector(".empty-estimatedTime").style.display = "none";},3000)
        return false;
    }

    // check if focus time is empty
    if(focusTime == ""){
        document.querySelector(".empty-focusTime").style.display = "block";
        setTimeout(()=>{document.querySelector(".empty-focusTime").style.display = "none";},3000)
        return false;
    }

    // check if break time is empty
    if(breakTime == ""){
        document.querySelector(".empty-breakTime").style.display = "block";
        setTimeout(()=>{document.querySelector(".empty-breakTime").style.display = "none";},3000)
        return false;
    }

    //check if focus time is greater than estimated time
    let estimatedHour = estimatedHr == "" ? 0 : Number(estimatedHr);
    let estimatedMinute = estimatedMin == "" ? 0 : Number(estimatedMin);
    let totalEstimatedTime =  ((estimatedHour * 60 )+ estimatedMinute) //in minutes

    

    if((totalEstimatedTime /1.5) < focusTime){
        document.querySelector(".focus-greater").style.display = "block";
        setTimeout(()=>{document.querySelector(".focus-greater").style.display = "none";},4000)
        return false;
    }

    // check if break time is greater than estimated time
    if((totalEstimatedTime/4) < breakTime){
        document.querySelector(".break-greater").style.display = "block";
        setTimeout(()=>{document.querySelector(".break-greater").style.display = "none";},4000)
        return false;
    }

    // check if break time is greater than focus time
    if(breakTime > (focusTime/2)){
        document.querySelector(".break-greater-focus").style.display = "block";
        setTimeout(()=>{document.querySelector(".break-greater-focus").style.display = "none";},4000)
        return false;
    }

    // if all the cases are satisfied then return true
    return true;

}

// Function to create task object
function createTaskObject(taskTitle,taskDesc,estimatedHr,estimatedMin,focusTime,breakTime){
    
    this.code = Date.now(); // unique code
    this.taskTitle = taskTitle;
    this.taskDesc = taskDesc;
    this.estimatedHr = estimatedHr;
    this.estimatedMin = estimatedMin;
    this.focusTime = focusTime;
    this.breakTime = breakTime;
}

// function to render task object in ui
function renderTask(obj){
    let parentDiv = document.querySelector(".tasks");
    
    let child = document.createElement('div');
    child.classList.add("card");
    child.setAttribute("code",obj.code);

    child.innerHTML = 
    `
        <div class="task-header">
            <p>${obj.taskTitle}</p>
            <span class="tag">Not started</span>
        </div>

        <div class="task-desc teritory-heading">
            ${obj.taskDesc}
        </div>

        <div class="time-required">
            <p>Estimated Time :- ${obj.estimatedHr}hr   ${obj.estimatedMin}min</p>
        </div>
    `
    parentDiv.appendChild(child);
}



// function to open modal box
function openModalBox(){
    document.querySelector(".modal-task").style.display = "flex";
}

// function to close modal Box
function closeModalBox(){
    document.querySelector(".modal-task").style.display = "none";
}   


// function to clear input fields
function clearInputFields(){
    // while closing all the input fields should be empty
    document.querySelector(".task-title").value = "";
    document.querySelector(".modal-task-desc").value = "";
    document.querySelector(".task-hour").value = "";
    document.querySelector(".task-min").value ="";
    document.querySelector(".focus-time").value = "";
    document.querySelector(".break-time").value = "";
}