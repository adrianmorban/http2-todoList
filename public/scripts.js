//DOM Objects
const container = document.getElementById('listContainer');
const table = document.getElementById('body');
const buttonCreate = document.getElementById('crearTarea');
const buttonUpdate = document.getElementById('guardarAct');
const updateListButton = document.getElementById('updateList');

let eliminar = document.getElementsByClassName('eliminar');
let editar = document.getElementsByClassName('editar');

let lastVersion = localStorage.getItem('lastVersion') || -1;

//Funciones

let Connected = true;
let contador = 0;

const handleConnectionChange = (event) => {
  if(event.type == "offline"){
    Connected = false;
  }
  if(event.type == "online"){
    Connected = true;
    let inserter = 0;
    if(localStorage.length != 0){
      while(inserter < localStorage.length){
        axios.post('/api/tasks',JSON.parse(localStorage.getItem(`toInsert${inserter}`)))
        .then(inserter++);
      }
      localStorage.clear();
      contador = 0;
    }
  }
}

window.addEventListener('online', handleConnectionChange);
window.addEventListener('offline', handleConnectionChange);

const crearTareas = () => {
  let Status = document.getElementById('Status');
    let createObject = {
      description: document.getElementById('Description').value,
      dueDate: document.getElementById('dueDate').value,
      status: Status.options[Status.selectedIndex].text
    };
  if(Connected == true){
    axios.post('/api/tasks',createObject).then(function (response) {
      alert('Creado todo bien');
      console.log(response);
    })
    .catch(function (error) {
      alert('Hubo un error');
      console.log(error);
    });
  }
  else{
    localStorage.setItem(`toInsert${contador}`,JSON.stringify(createObject));
    contador++;
  }
}

const updateTarea = (recurso) => {
  let Status = document.getElementById('StatusAct');
  let updateObject = {
      description: document.getElementById('DescriptionAct').value,
      dueDate: document.getElementById('dueDateAct').value,
      status: Status.options[Status.selectedIndex].text
  };
  axios.put('/api/task/' + recurso, updateObject)
  .then(()=> alert('Se modiico bien'))
  .catch('Hubo un error, intentelo de nuevo')
}

const createValues = (tasks) => {
  let fragment = document.createDocumentFragment();
  for(let i = 0; i < tasks.length; i++){
      let tr = document.createElement('tr');
      let id = document.createElement('th');
      let description = document.createElement('th');
      let dueDate = document.createElement('th');
      let status = document.createElement('th');
      let action = document.createElement('th');
      action.innerHTML = `<span class="editar ${tasks[i]._id}" data-toggle="modal" data-target="#actualizarTask">Editar</span> <span class="eliminar ${tasks[i]._id}">Eliminar</span>`
      id.textContent = tasks[i]._id;
      description.textContent = tasks[i].description;
      dueDate.textContent = tasks[i].dueDate.substring(0,10);
      status.textContent = tasks[i].status;
      tr.appendChild(id);
      tr.appendChild(description);
      tr.appendChild(dueDate);
      tr.appendChild(status);
      tr.appendChild(action);
      fragment.appendChild(tr);
  }
  return fragment;
}

buttonCreate.addEventListener('submit',(e)=> {
    e.preventDefault();
    alert('no se sabe');
    crearTareas();
})

updateListButton.addEventListener('click', ()=>{
  axios.head('/api/tasks',{ validateStatus: function (status) {
    return status == 200 || status == 304;
  },headers: {'If-None-Match': lastVersion}}).then(response => {
    if(response.headers.status == 200){
      localStorage.setItem('lastVersion', response.headers.etag);
      lastVersion = localStorage.getItem('lastVersion') 
      axios.get('/api/tasks').then((res) => {
        let tasks = res.data;
        let append = createValues(tasks);
        table.innerHTML = "<tr id='atributos'><th>ID</th><th>Description</th><th>Due date</th><th>Status</th><th>Action<th></tr>"
        table.appendChild(append);
      })
    }
    else {
      alert('No se han hecho modificaciones a la db');
      localStorage.setItem('lastVersion', response.headers.etag);
      lastVersion = localStorage.getItem('lastVersion') 
    }
  })
})

axios.get('/api/tasks')
  .then((response) => {
    let tasks = response.data;
    let append = createValues(tasks);
    table.appendChild(append);

    eliminar = Array.from(eliminar);
    editar = Array.from(editar);

    eliminar.forEach(element => {
      element.addEventListener('click',()=>{
          let recurso = element.className.split(' ')[1];
          axios.delete('/api/task/'+ recurso)
          .then(() => alert('Se elimino bien'));
      })    
    });

    editar.forEach(element => {
      element.addEventListener('click', ()=>{
        let recurso = element.className.split(' ')[1];
        buttonUpdate.addEventListener('submit',(e)=>{
          e.preventDefault();
          updateTarea(recurso);
      })
      })
    })
  })
  .catch((error) => {
    console.log(error);
  });
