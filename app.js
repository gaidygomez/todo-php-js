const buscar = document.getElementById('dataSearch');
const form = document.getElementById('task-form');
const response = document.getElementById('response');
const result = document.getElementById('tasks');

buscar.addEventListener('keyup', search);
form.addEventListener('submit', enterData);
document.addEventListener('DOMContentLoaded', getTasks);

function search (event) {
	event.preventDefault();
	
	let data = new FormData(buscar); 
	let datos = data.get('search')

	fetch('getTasks.php/?search='+datos)
		.then(res => res.json())
		.then(resultado)
		.catch(err => console.log(err))
	}

function enterData(event) {
	event.preventDefault();

	let data = new FormData(form);

	fetch('addTasks.php', {
		method: 'post',
		body: data
	})
		.then(res => res.json())
		.then(datos => {

			if (!datos) {
				response.innerHTML = `
				<div class="alert alert-danger alert-dismissible fade-out show" role="alert">
  					<strong>Le comunicamos: </strong> El nombre de la tarea es requerido.
  					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button>
				</div>
				`
			} else {
				response.innerHTML = `
				<div class="alert alert-success alert-dismissible fade-out show" role="alert">
  					<strong>Su tarea ha sido añadida.</strong>
  					<button type="button" class="close" data-dismiss="alert" aria-label="Close">
    					<span aria-hidden="true">&times;</span>
  					</button>
				</div>
				`
				form.reset()

				getTasks()
			}
		})
		.catch(err => {
			console.log(err)
		})

}

function resultado (datos) {

	result.innerHTML = '';

	for (let data in datos) {

	    result.innerHTML += `
	    	<tr>
				<td>${datos[data].id}</td>
				<td>${datos[data].name}</td>
				<td>${datos[data].description}</td>
				<td>${datos[data].status}</td>
		       	<td>
		       		<div class="btn-group" role="group" aria-label="Basic example">
				  		<button type="button" class="btn btn-success" onclick="editData('${datos[data].id}', '${datos[data].status}')">Editar</button>
				  		<button type="button" class="btn btn-danger" id="delete">Eliminar</button>
					</div>
				</td>
	       </tr>
	    `	    
	}

	if (datos.length === 0) {
		result.innerHTML += `
			<td colspan="5" class="text-center">
				<div class="p-2">
					<strong> No hay datos </strong>
				</div>
			</td>
		`
	}
}

function getTasks() {

	result.innerHTML = '';

	fetch('Tasks.php')
		.then(res => res.json())
		.then(tareas)
		.catch(err => console.log(err))
}

const tareas = (datos) => {

	result.innerHTML = '';

	for (let data in datos) {
	       
	    result.innerHTML += `
	    	<tr>
		       <td>${datos[data].id}</td>
		       <td>${datos[data].name}</td>
		       <td>${datos[data].description}</td>
		       <td>${datos[data].status}</td>
		       <td>
		       		<div class="btn-group" role="group" aria-label="Basic example">
				  		<button type="button" class="btn btn-success" onclick="editData('${datos[data].id}', '${datos[data].status}')">Editar</button>
				  		<button type="button" class="btn btn-danger" id="delete">Eliminar</button>
					</div>
				</td>
	       </tr>
	    `
	}
}

const editData = (id, status) => {console.log(id+" "+status)}