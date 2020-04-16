const clear = document.querySelector(".icon-arrows-cw");
const now=document.querySelector(".date");
const list=document.querySelector(".list");
const input=document.getElementById("item");
const add=document.querySelector(".icon-plus-circled");

const CHECK="icon-ok-circled";
const UNCHECK="icon-circle-empty";
const lineThrough="lineThrough";

let LIST;
let id;

let data=localStorage.getItem("TODO");

if(data){
    LIST=JSON.parse(data);
    id=LIST.length;
    loadList(LIST);
}else{
    LIST=[];
    id=0;
}

function loadList(array){
    array.forEach(function(item){
        addToDo(item.name, item.id, item.done);
    });
}
clear.addEventListener("click",function(){
    localStorage.clear();
    location.reload();
})
const today= new Date();
now.innerHTML=today.toLocaleDateString();

function addToDo (td,id,done){
  

    const DONE= done ? CHECK : UNCHECK;
    const LINE = done? lineThrough : "";

        const item= `<li class="item">
                    <i class="demo-icon ${DONE}" job="complete" id="${id}"></i>
                     <p class="text ${LINE}"> ${td}</p>
                    <i class="demo-icon icon-trash" job="delete" id="${id}"></i> 
                     </li>`;
        const position = "beforeend";

    list.insertAdjacentHTML(position,item);
}

document.addEventListener("keyup",function(e){
    if(e.keyCode == 13){
        const td=input.value;
        
        if (td){
            addToDo(td,id,false);

            LIST.push({
                name: td,
                id: id,
                done: false
            });

                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
        }

    input.value="";
    }
});
add.addEventListener("click",function(e){
    
        const td=input.value;
        console.log(td);
        if (td){
            addToDo(td,id,false);

            LIST.push({
                name: td,
                id: id,
                done: false
            });

                localStorage.setItem("TODO", JSON.stringify(LIST));
                id++;
        }

    input.value="";
    
});
function completeToDo(task){
    task.classList.toggle(CHECK);
    task.classList.toggle(UNCHECK);
    task.parentNode.querySelector(".text").classList.toggle(lineThrough);

    LIST[task.id].done=LIST[task.id].done ? false : true;
}

function removeToDo(task){
    task.parentNode.parentNode.removeChild(task.parentNode);
}

list.addEventListener("click", function(e){
    const task = e.target;
    const taskjob = task.attributes.job.value;

    if (taskjob === "complete"){
        completeToDo(task);
    }else if( taskjob ==="delete"){
        removeToDo(task);
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
});

