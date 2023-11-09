// This file add the functionality for pomodoro timers

// sample task
// currTask = {
//     code : 10002320, // unique code
//     taskTitle : "task 1",
//     taskDesc : "Some task",
//     estimatedHr : 0,
//     estimatedMin : 2,
//     focusTime : 1,
//     breakTime :1
// }



let timer;



let hour = document.querySelector(".hour");
let min = document.querySelector(".min");
let sec = document.querySelector(".sec");





// Function to start the pomodoro timer
function pomodoro(){

    let totalTime = (currTask.estimatedHr * 60) + currTask.estimatedMin + 1;
    let focusTime = currTask.focusTime +1;
    let breakTime = currTask.breakTime +1;
    
    
    let initialHr = currTask.estimatedHr;
    let initialMin = currTask.estimatedMin;
    let initialSec = 0;


   updateTimer(initialHr,initialMin,initialSec)

   
    
    // initialise a set Interval to run the timer every sec

    timer = setInterval(()=>{
        
        
        // In each sec decrement the sec count
        initialSec--;
        

        // if 1 min in reached reduced a min from total estimated time
        if(initialSec < 0){
            
            totalTime--; 
            
        }
        
        //if total estimated time is zero then stop the timer and the task has been finished
        if(totalTime == 0){
            
            displayBreakPhase(0);
            displayFocusPhase(0);
            displayCompletePhase(1);

            onCompleteTask();
            
        }

        else{
            // every sec update focus time
            updateFocusTime(initialSec);
        
        
        
            // every 1 min the sec count back to 59 and min count is reduced by 1
            if(initialSec < 0){
                initialSec = 59;
                initialMin--;
                
            }

            //   if min count reaches 0 ie 1 hr have encountered, reduce the count of hour if and only if currHr is greater than 1
            // if curr Hour is greater than 1 then min count moves back to 59 
            if(initialMin < 0 && initialHr >0){
                initialHr--;
                initialMin = 59;
            }
        
            // Every sec update the respective timer in UI

            updateTimer(initialHr,initialMin,initialSec)
        }  
        
    },1000)



    //function to update focusTime
    function updateFocusTime(initialSec){

        //  if focus time is greater than 0 then display focus time
        if(focusTime >0){
            
            // display focus time phase
            displayFocusPhase(1);
            displayBreakPhase(0);

            //  if 1 min reached then reduce the focus count
            if(initialSec < 0){
                focusTime--;

                // when focus time is zero then break time quotes should be displayed
                if(focusTime){
                    // whenever a min is reached a new quotes is displayed
                    document.querySelector(".quotes p").innerText = generateQuotes(focusQuotes);
                }
                else{
                    
                    document.querySelector(".quotes p").innerText = generateQuotes(breakQuotes);
                }
                
            }

            // if focus time is zero then make break time into original break time
            if(focusTime <= 0) breakTime = currTask.breakTime;
        }
        else{
           
            
            // if focusTime is <=0 then call breakTime
            updateBreakTime(initialSec)
        }
    
    }

    //function to update breakTime
    function updateBreakTime(initialSec){
        //  if break time is greater than 0 then display break time
        if(breakTime > 0){
        

            // display break time
            displayBreakPhase(1);
            displayFocusPhase(0);

            //  if a min have been encountered then reduce the break time by 1
            if(initialSec <0){
                breakTime--;

                if(breakTime){
                    // whenever a min is reached a new quotes is displayed
                    document.querySelector(".quotes p").innerText = generateQuotes(breakQuotes);
                }
                else{
                    
                    document.querySelector(".quotes p").innerText = generateQuotes(focusQuotes);
                }
            }

            // if focus time is zero then make focus time into original focus time
            if(breakTime <= 0) focusTime = currTask.focusTime;
        }
        else{
            
            // call update focus time function
            updateFocusTime(initialSec);
        }
    }
}



// Function to update timer in UI
function updateTimer(initialHr,initialMin,initialSec){
 
    hour.innerText = initialHr;
    min.innerText = initialMin;
    sec.innerText = initialSec;

    if(initialHr < 10){
        hour.innerText = `0${initialHr}`;
    }

    if(initialMin < 10){
        min.innerText = `0${initialMin}`;
    }

    if(initialSec <10){
        sec.innerText = `0${initialSec}`;
    }
}


// function to display focus phase message
function displayFocusPhase(flag){
    if(flag) document.querySelector(".focus-phase").style.display = "block";
    else document.querySelector(".focus-phase").style.display = "none";
}

//function to display break phase message
function displayBreakPhase(flag){
    if(flag)document.querySelector(".break-phase").style.display = "block";
    else document.querySelector(".break-phase").style.display = "none";
}

//function to display complete phase message
function displayCompletePhase(flag){
    if(flag)document.querySelector(".complete-phase").style.display = "block";
    else document.querySelector(".complete-phase").style.display = "none";
}

// when a task is completed, clear timer,modifiy tag of the task,pop up success message and close the task page in 4 sec
function onCompleteTask(){
    clearInterval(timer);
    // print the success message
    document.querySelector(".task-done").style.display = "block";

    // update the timer count as 0
    document.querySelector(".hour").innerText = "00";
    document.querySelector(".min").innerText = "00";
    document.querySelector(".sec").innerText = "00";

    //display no phases
    displayBreakPhase(0);
    displayCompletePhase(0);
    displayFocusPhase(0);

    //no quotes should be displayed
    document.querySelector(".quotes p").innerText = "";

    // change the task tag to completed
    currNode.querySelector(".tag").innerText = "Completed";
    currNode.querySelector(".tag").style.backgroundColor = "green";

    currTask.taskStatus = "COMPLETED";
    // now update the changes in local storage
    localStorage.setItem("tasks",JSON.stringify(newTasks));
    
    // show sucess pop up for 4 secs
    setTimeout(()=>{document.querySelector(".task-done").style.display = "none";},4000)
    // soon after 4 sec task page is closed
    setTimeout(()=>closeTaskPage(),4001)
}

function generateQuotes(arr){
    let maxLength = arr.length;

    let randomIndex = Math.floor((Math.random() * maxLength));
    
    return arr[randomIndex];
}

