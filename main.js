let tasks = [
    {
        "title":"قراءة كتاب",
        "date":"15/10/2030" ,
        "isDone":false,
    },
    {
        "title":"إنهاء المشروع النهائي",
        "date":"20/3/2023" ,
        "isDone":false,
    },
    {
        "title":"إنهاء كورس الجافا سكريبت",
        "date":"17/4/2023" ,
        "isDone":false,
    },
    {
        "title":"حل التحدي",
        "date":"12/10/2040" ,
        "isDone":true,
    },
]

function getTasksFromStorage(){
  let retrievedTasks = JSON.parse(localStorage.getItem("tasks"))
 
tasks = retrievedTasks ?? []
  // if(retrievedTasks === null){
  //   tasks = [] 
  // } else {
  //   tasks = retrievedTasks
  // }
}
getTasksFromStorage()





    
function fillTasksOnThePage(){
    document.getElementsByClassName("tasks")[0].innerHTML = "";

var index= 0;
for (var task of tasks){
    let content =  `
 
    <div class="task ${task.isDone ? "done" : ""} ">
    <ul class="icons">
      <li>
        <button onclick="editTask(${index})">
          <span class="material-symbols-outlined"> edit </span>
        </button>
      </li>
      <li>
      ${task.isDone ?  `
      <button onclick="toggleTaskCompletion(${index})" class="taskDone" style= "background-color: red">
       <span class='material-symbols-outlined'> close </span> 
      </button>
      ` :
        `
        <button onclick="toggleTaskCompletion(${index})"  class="taskDone">
         <span class='material-symbols-outlined'> done </span> 
        </button>
        `
   
     }
 
      </li>
      <li>
        <button onclick="deleteTask(${index})">
          <span class="material-symbols-outlined"> delete </span>
        </button>
      </li>
    </ul>
    <div class="task-info">
      <h3>${task.title}</h3>
      <div
        style="
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 5px;
        "
      >
        <span>${task.date}</span>
        <span class="material-symbols-outlined"> calendar_month </span>
      </div>
    </div>
   </div>
    `

 document.getElementsByClassName("tasks")[0].innerHTML += content;
 index++;
}
}
fillTasksOnThePage()
document.getElementsByClassName("add-task")[0].addEventListener("click",function(){
    let taskName = prompt("الرجاء إدخال عنوان المهمة ");
    let now = new Date();
    let year = now.getFullYear();
    let month= now.getMonth() + 1;
    let day = now.getDate();
    let hours =now.getHours()
    let minutes =now.getMinutes()
    day < 10 ?  day ="0"+day : "";
   month < 10 ? month = "0"+month : "";
   let newDate = `${hours > 12 ? hours = (hours - 12): hours}:${minutes < 10 ? "0"+minutes : minutes} | ${day}/${month}/${year}  `
    if(taskName !== null){
        let taskObj = {
                "title":taskName,
                "date":newDate ,
                "isDone":false,
            
        }
        tasks.push(taskObj)
 
        storeTasks()

        fillTasksOnThePage()
    }
})

function deleteTask(index){
 let isConfirmed = confirm(`هل انت متاكد من حذف المهمة: ${tasks[index].title} ؟ `)

if(isConfirmed){
  tasks.splice(index,1);
  storeTasks()
  fillTasksOnThePage()
}
  
}
function editTask(index){
var newTaskTitle = prompt(" الرجاء تحديد عنوان المهمة الجديد",tasks[index].title)
if(newTaskTitle !== null){
  tasks[index].title = newTaskTitle
  storeTasks()
  fillTasksOnThePage()
}
}


function toggleTaskCompletion(index){
  let task = tasks[index]
 task.isDone = !task.isDone
 storeTasks()
 fillTasksOnThePage()
}

// ================local storage ================


function storeTasks(){
  
  let tasksString = JSON.stringify(tasks)
  localStorage.setItem("tasks",tasksString)
}