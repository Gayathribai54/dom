


 let is24hours=false;

const header= document.getElementById('head');
header.innerHTML='<span> Welcome Student</span>';




const timediv= document.querySelector('#time');
function updateTime(){
   if(is24hours){
      timediv.innerText = new Date().toLocaleTimeString("en-GB",{hours12:false},{hour:'2-digit'},{minute:'2-digit'},{second:'2-digit'});
   }
   else{
      timediv.innerText = new Date().toLocaleTimeString();
   }
}
setInterval(updateTime,1000);

const date= document.querySelector('#date');
function updateDate(){
date.innerText= new Date().toLocaleDateString('en-IN');
}
updateDate();







const click= document.querySelector('button');
click.addEventListener('click',function(){
     is24hours=!is24hours;
     is24hours?
     click.innerText="Switch to 12 hours"
     :click.innerText="Switch to 24 hours"
     updateTime();
})
