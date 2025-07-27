

function generateTaskId(){
    return Math.floor(1000+Math.random()*9000);
}


const plus= document.querySelector('.btn');
const input= document.querySelector('.text');
const order=document.querySelector('ul');
const buttons=document.querySelectorAll('.filterBtn');
let currentFilter= 'all';
let filterarr= [];
let arr=[];
const clearComplete=document.querySelector('.clear');
let counter=document.querySelector('#count');
let counts=0;
plus.addEventListener('click',function(){
    const taskText= input.value;
    if(taskText!==""){
    addTask(taskText);
    //clear existing list
     //order.innerHTML="";
    applyFilter();
    }
});


function addTask(userinput){
   const  newTask={
        id:generateTaskId(),
        text: userinput,
        completed:false 
    }
    console.log(newTask);
    arr.push(newTask);
    updateCount();
}

function showTask(){
    order.innerHTML="";
    if(filterarr.length===0){
        order.innerHTML='<li class="empty">Your to do list is empty</li>';
    }
    filterarr.forEach((call)=>{
        //creating items inside list
    const list=document.createElement('li');
    list.setAttribute("data-id",call.id);
    const check=document.createElement('input')
    check.type="checkbox";
    check.checked=call.completed;
    const span= document.createElement('span');
    span.innerText=call.text;
    if(check.checked===true){
        span.classList.add('completed');
    }
    check.addEventListener("change",()=>{
        handleToggle(call.id);
    });
    // DEL BUTTON
    const del=document.createElement('button');
    del.className="delBtn";
    del.innerHTML='<i class="fa-solid fa-trash"></i>';
    del.addEventListener('click',()=>{
         arr = arr.filter(task => task.id !== call.id);
         applyFilter();
         updateCount();
    })


    //adding items inside list
    list.append(check);
    list.append(span);
    list.append(del);
    order.append(list);
    });
    input.value="";
    
 }

//handle toggle 
 function handleToggle(id){
    arr=arr.map((call)=>{
        if(call.id===id){
            return{...call,completed:!call.completed}
        }
        else{
            return call;
        }
    })
    applyFilter();
    updateCount();
 }
    
    


    //empty message
    document.addEventListener("DOMContentLoaded",function(){
       applyFilter();
    });
//enter key access
    input.addEventListener("keypress",function(event){
        if(event.key==="Enter"){
          const taskText= input.value;
           if(taskText!==""){
            addTask(taskText);
           //clear existing list
           //order.innerHTML="";
          applyFilter();
           }
        }
    })
    
buttons.forEach((button)=>{
    button.addEventListener("click",()=>{
        buttons.forEach(filterBtn=>filterBtn.classList.remove('active'));
        button.classList.add('active');
        currentFilter=button.getAttribute("data-filter");
        applyFilter();
    })
});


 function applyFilter(){
    if(currentFilter==='all'){
          filterarr= arr;
    }
    else if(currentFilter=== 'active'){
         filterarr= arr.filter(call => call.completed===false);
    }
    else if(currentFilter==='completed'){
         filterarr=arr.filter(call=>call.completed===true);
    }
    showTask();
 }


 clearComplete.addEventListener('click',()=>{
       arr = arr.filter(task => !task.completed); // remove completed tasks
       applyFilter();
       updateCount();
 });



 function updateCount(){
    const activeTasks= arr.filter(call=>!call.completed);
    let counts=0
    counts=activeTasks.length;
    counter.textContent= counts;
 }