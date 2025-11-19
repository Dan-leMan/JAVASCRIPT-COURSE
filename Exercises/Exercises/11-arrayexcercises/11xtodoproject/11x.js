
let todoList = [];
try{
  const stored = JSON.parse(localStorage.getItem('todoList'));
  if(Array.isArray(stored)){
    todoList = stored;
  }
} catch {

}

if (todoList.length === 0){
  todoList = [{
  name: 'make dinner',
  dueDate: '2025-11-09'
}, {
    name: 'wash dishes',
    dueDate: '2025-11-09'
}];
}

renderToDoList();

function renderToDoList(){
  let todoListHTML = '';

  for (let i = 0; i < todoList.length; i++){
    const todoObject = todoList[i];
    //const name = todoObject.name;
    //const dueDate = todoObject.dueDate;
    const { name, dueDate} = todoObject;
    const html = `
      <div>${name}</div>
      <div>${dueDate}</div> 
      <button class="delete-todo-button" onclick="
        todoList.splice(${i}, 1);
        renderToDoList();
        saveToStorage();
      ">Delete</button>
      `;
    todoListHTML += html;
  }

  document.querySelector('.js-todo-list').innerHTML = todoListHTML;
}


function addToDo(){
  const inputElement = document.querySelector('.js-name-input');
  const name = inputElement.value;
  
  const dateInputElement = document.querySelector('.js-due-date-input');
  const dueDate = dateInputElement.value;

  todoList.push({
    //name: name,
    //dueDate: dueDate
    name,
    dueDate
  });

  inputElement.value = '';

  renderToDoList();

  saveToStorage();
}

function saveToStorage(){
  localStorage.setItem('todoList', JSON.stringify(todoList));
   //localStorage.setItem('todoList',todoList);
}

