const tasksList = document.querySelector('.tasks_list'); 
const btnTask = document.querySelector('.btn-task');      
const tasks = document.querySelector('.tasks');  

var arrayList = []

document.addEventListener('DOMContentLoaded', showList); 
btnTask.addEventListener('click', addTasks);        
tasksList.addEventListener('click', checkTask);      

function addTasks(){                
    const newTask = tasks.value;         
    if(newTask.trim() != 0){
        addLocalStorage(newTask);   
        showList();                                    
        tasks.value = '';                   
    }else{
        window.alert('Digite algo valido!');
    }
}

function showList(){ 
    const arrayList = getLocalStorage();
    tasksList.innerHTML = '';                                        
    
    arrayList.forEach(function(newTask, index){
        const ul = document.createElement('ul');
        ul.classList.add('list');                             
                         
        const checkbox = document.createElement('input');              
        checkbox.setAttribute("type", "checkbox");                 
        checkbox.classList.add('checkbox');                    
        ul.appendChild(checkbox);                                    

        const li = document.createElement('li')                         
        li.innerHTML = newTask;                                      
        li.classList.add('listItem');                                 
        ul.appendChild(li);                                     

        const deleteBtn = document.createElement('button');            
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`;
        deleteBtn.classList.add('deleteBtn');
        deleteBtn.setAttribute('onclick', `deleteTask(${index})`);
        ul.appendChild(deleteBtn);

        tasksList.appendChild(ul);      
    })
}

function checkTask(event){                      
    const item = event.target;                   
    const check = item.parentElement;       

    if(item.classList[0] === 'checkbox'){      
        check.classList.toggle('completed');  
    }     
}

function deleteTask(index){
    const checkDelete = window.confirm("Deseja excluir?");

    if(checkDelete === true) {
        const storageList = localStorage.getItem('tasksList');            
        arrayList = JSON.parse(storageList);                            
        arrayList.splice(index, 1);                                    
        localStorage.setItem('tasksList', JSON.stringify(arrayList));  
        showList();                                                     
    }
}

function getLocalStorage(){
   let storageList = localStorage.getItem('tasksList'); 

   if(storageList === null){
    arrayList = [];                                   
   }else{
    arrayList = JSON.parse(storageList);               
   }
   return arrayList;                        
}

function addLocalStorage(newTask){
    const arrayList = getLocalStorage();                              
    arrayList.push(newTask);                                        
    localStorage.setItem('tasksList', JSON.stringify(arrayList));   
}
