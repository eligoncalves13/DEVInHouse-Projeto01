//Declaração de variaveis globais 
arraylist = []

var tasksList = document.querySelector('.tasks_list'); //Selecionar a lista onde será adicionado as tarefas
var btnTask = document.querySelector('.btn-task');     //Selecionar o botão para adicionar a tarefa 
var tasks = document.querySelector('.tasks')           //Selecionar o input para adicionar a tarefa 


//Adicionar eventos
document.addEventListener('DOMContentLoaded', showlist); //Carregar a pagina para executar a função
btnTask.addEventListener('click', addtasks)              //Clicar para executar a função
tasksList.addEventListener('click', checkTask)           //Clicar para executar a função


//Função que será acionada ao clicar
function addtasks(){                
    var newtask = tasks.value;               //Selecionar o valor do input
    //Condição que erifica se não foi digitado espaços em branco
    if(newtask.trim() != 0){
        addLocalStorage(newtask)            //Chamar função que salva no localSorage  
        showlist()                          //Chamar função que mostra a lista              
        tasks.value = '';                   //Limpar campo depois de digitar
    }else{
        window.alert("Digite algo valido!") //Alertar para digitar um valor valido
    }
}

//Função para criar e mostrar a lista
function showlist(){
    var arraylist = getLocalStorage();
    tasksList.innerHTML = '';                                         //Não repetir tarefas
    
    arraylist.forEach(function(newtask, index){
        var ul = document.createElement('ul');                        //Criar uma ul
        ul.classList.add('list')                                      //Adicionar uma classe para a ul
                         
        var checkbox = document.createElement('input');               //Criar um input
        checkbox.setAttribute("type", "checkbox")                     //Atribuir um checkbox para o imput
        checkbox.classList.add('checkbox')                            //Adicionar uma classe para o input
        ul.appendChild(checkbox)                                      //Adicionar o input na ul

        var li = document.createElement('li')                         //Criando uma li
        li.innerHTML = newtask;                                       //Adicionar a nova tarefa na li
        li.classList.add('listItem');                                 //Adicionar uma classe para a li
        ul.appendChild(li)                                            //Adicionar a li na ul

        var deleteBtn = document.createElement('button');             //Criando um botão 
        deleteBtn.innerHTML = `<i class="fas fa-trash"></i>`          //Adicionar um icone para o botão
        deleteBtn.classList.add('deleteBtn')                          //Adicionar uma classe para o botão
        deleteBtn.setAttribute('onclick', `deleteTask(${index})`)     //Atribuir o  evento de clique e a função para deletar
        ul.appendChild(deleteBtn)                                     //Adicionar o botão na ul

        tasksList.appendChild(ul)                                     //Adicionar a ul na lista de tarefas       
    })
}

//Função para realizar check na tarefa 
function checkTask(event){                      
    var item = event.target                    //Identificar o elemento que ocorreu o evento
    var check = item.parentElement             //Retornar elemento pai  
    //Condição para verificar 
    if(item.classList[0] === 'checkbox'){      
        check.classList.toggle('completed')    //Alternar classe do elemento
    }   
}

//Função para remover tarefa 
function deleteTask(index){
    var checkDelete = window.confirm("Deseja excluir?")                 //Variavel local 
    //Cindição para cofirmar a remoção
    if(checkDelete == true) {
        var storageList = localStorage.getItem('tasksList');            //Variável local
        arraylist = JSON.parse(storageList)                             //Converter um objeto JSON em um texto
        arraylist.splice(index, 1)                                      //Remover o item do array conforme o indice
        localStorage.setItem('tasksList', JSON.stringify(arraylist));   //Adicionar a chave no storage e converter para um String JSON
        showlist()                                                      //Chamar função que mostra a lista     
    }
}

//Função para recuperar as tarefas do localStorage
function getLocalStorage(){
   var storageList = localStorage.getItem('tasksList');  //Variável local
   //Condição para verificar se o storage está nulo
   if(storageList === null){
    arraylist = []                                       //Atribuir uma array vazia
   }else{
   arraylist = JSON.parse(storageList)                   //Converter um objeto JSON em um texto
   }
   return arraylist;                        
}

//Função para salvar as tarefas no localStorage
function addLocalStorage(newtask){
    var arraylist = getLocalStorage();                              //Variável local
    arraylist.push(newtask);                                        //Adicionar nova tarefa no array
    localStorage.setItem('tasksList', JSON.stringify(arraylist));   //Adicionar a chave no storage e converter para um String JSON
}
