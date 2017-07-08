/*

# Realizar un ToDoList, en el cual podremos agregar, borrar o ordenar tareas.

Cada tarea tendra las siguientes propiedades.

1) Crear el módulo ToDoList.

2) Cargar contenido de prueba:
- El modulo tendra un array llamado "tareas".
- Dentro del array tendremos objetos tarea.
- Cada objeto tarea tendrá las siguientes propiedades:
	- id: numerico
	- titulo: Texto
	- imagen: Nombre de la imagen (nombre del archivo + extensión).
	- descripción: texto
	- completado: booleano.
- Cargar 4 objetos tarea en el array de "tareas".

3) Mostrar tareas en la pantalla (Renderizar)
- Renderizar el array de tareas en la pantalla.
- Cada una de las tareas deben estar encerradas en un li que tenga la clase "tarea".
- Luego, cada li deberá ser agregados a un ul en el html que tenga la clase "tareas".

4) Crear formulario para agregar Tareas:

- Deberemos ser capaces de agregar una "tarea" mediante un formulario.
- El formulario tendrá 3 campos:
	- titulo: Se lo podrá ingresar por el formulario.
	- imagen: nombre del archivo + extensión.
	- descripción: Se lo podrá ingresar por un textarea formulario.
- El ID de la tarea será generado aleatoriamente.
- La tarea inicializará el estado completado en false.


5) Botón de "agregar".
- El formulario tendrá un botón de "Agregar Tareas".
	- Al apretar el botón agregaremos una tarea al array de tareas.
	- Ademas agragaremos la tarea a la pantalla.

3) Eliminar una tarea.
- Dentro de si misma en el html, cada tarea deberá tener un botón que se llame "Eliminar Tarea".
- Al presionarlo hara lo siguiente:
	- Pedir un mensaje de confirmación de la operación.
	- Eliminará la tarea del array de tareas.
	- Eliminará la tarea del html.

4) Crear botones para ordenar las tareas.
- Crear botones para ordernar el array de tareas por A-Z y Z-A las tareas por titulo.
- Renderizar el array ordenado.

5) Marcar como completado.
- Agregar un botón que sea completar tarea.
- Al apretarlo, la tarea pasará a estar completada.
- Las tareas que estén completadas tendran el estado complatado en true;
- Si una tarea tiene el estado completado en true, se agregará al li la clase "completado"
- Esta clase le dará un estilo diferente a la tarea.
- Si la tarea ya esta completada, se esconderá el botón.

5) Botón para salvar.
- Las tareas deberan quedar persistidas mediante localStorage y poder mostrarse en caso de recargar el browser.
*/
//esto es un modulo
var toDoList = (function() {
  // array de objetos
  var tareas = [
    // {
    //   id: 0,
    //   titulo: 'Titulo...',
    //   imagen: '',
    //   descripcion: 'descripcion..',
    //   completado: false,
    // },
    //
    // {
    //   id: 1,
    //   titulo: 'Titulo...',
    //   imagen: '',
    //   descripcion: 'descripcion..',
    //   completado: false,
    // },
    // {
    //   id: 2,
    //   titulo: 'Titulo...',
    //   imagen: '',
    //   descripcion: 'descripcion..',
    //   completado: false,
    // },
    // {
    //   id: 3,
    //   titulo: 'Titulo...',
    //   imagen: '',
    //   descripcion: 'descripcion..',
    //   completado: false,
    // },
  ]

  //creo etiquetas mediante javascript
  function renderizarTareaIndividual(tarea) {
    //crear el contenedor -> ul
    var contenedorDeTareas = document.querySelector('.lista-de-tareas')
    //crear de lista
    var contenedorLi = document.createElement('li')
    contenedorLi.className = 'tarea'
    //crear titulo
    var titulo = document.createElement('h2')
    titulo.innerHTML = tarea.titulo
    //crear imagen
    // var imagen=document.createElement('img');
    // imagen.src = 'img/' + tarea.imagen;
    //crear descripcion
    var descripcion = document.createElement('p')
    descripcion.innerHTML = tarea.descripcion
    //crear completada

    //render
    contenedorLi.append(titulo)
    // contenedorLi.append(imagen)
    contenedorLi.append(descripcion)

    contenedorDeTareas.appendChild(contenedorLi)
  }
  function renderizarTareas() {
    for (var tarea in tareas) {
      //Leo la base de datos de la lista
      console.log(tarea)
      renderizarTareaIndividual(tarea)
    }
  }

  var botonAgregar = document.getElementById('agregar-tarea')
  botonAgregar.addEventListener('click', function(event) {
    //prevengo eventos al inicio
    event.preventDefault()
    // obtengo los datos del usuario de las tareas
    var nombreAAgregar = document.getElementById('titulo').value
    var nombreDeLaImagen = document.getElementById('ruta-imagen').value
    var descripcion = document.getElementById('descripcion').value
    var idAAgregar = Math.random()

    //creo objeto tarea nueva
    var nuevaTarea = {
      id: idAAgregar,
      titulo: nombreAAgregar,
      descripcion: descripcion,
      imagen: nombreDeLaImagen,
      completado: false,
    }

    //pusheo el nuevo objeto dentro del objeto tareas
    tareas.push(nuevaTarea)
    //uso la funcion para mostrar la tarea nueva
    renderizarTareaIndividual(nuevaTarea)
  })

  //FUNCION cuando apreto guardar guardar en localStorage
  var botonSalvar = document.getElementById('salvar')

  botonSalvar.addEventListener('click', function(event) {
    event.preventDefault()
    //uso json para guardar el objeto en localStorage de google
    var tareasString = JSON.stringify(tareas)
    localStorage.setItem('tareas', tareasString)
  })

  function restaurarTareas() {
    var itemsRecuperadosEnString = localStorage.getItem('tareas')
    if (itemsRecuperadosEnString !== null) {
      //construyo el objeto que hice mas arriba con JSON
      var itemsRecuperados = JSON.parse(itemsRecuperadosEnString)
      tareas = itemsRecuperados
      renderizarTareas()
    }
  }

  return {
    init: function() {
      //llamo a la funcion que leera los objetos lista y los crea
      renderizarTareas()
    },
  }
})().init()
