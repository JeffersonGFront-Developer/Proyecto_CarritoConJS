// Variables

const carrito = document.querySelector("#carrito");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const listaCursos = document.querySelector("#lista-cursos");
let articulosCarrito = [];

cargarEventListeners();
function cargarEventListeners() {
  //Cuando agregas un curso presionando "Agregar al Carrito"
  listaCursos.addEventListener("click", agregarCurso);

  // Elimina cursos del Carrito
  carrito.addEventListener("click", eliminarCurso);

  // Vaciar Carrito
  vaciarCarritoBtn.addEventListener("click", () => {
    articulosCarrito = []; // reseteamos el carrito

    limpiarHTML(); // eliminamos todo el HTML
  });
}

// funciones

function agregarCurso(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const cursoSeleccionado = e.target.parentElement.parentElement;
    leerDatosCurso(cursoSeleccionado);
  }
}

// Elimina un curso del carrito

function eliminarCurso(e) {
  if (e.target.classList.contains("borrar-curso")) {
    const cId = e.target.getAttribute("data-id");

    // Elimina del arreglo de articulosCarrito por el data-id
    cursoId = articulosCarrito.findIndex((it) => it.id === cId);
    curso = articulosCarrito[cursoId];

    if (curso) {
      curso.cantidad -= 1;
      if (curso.cantidad === 0) {
        articulosCarrito.splice(cursoId, 1);
      }
    }

    // articulosCarrito = articulosCarrito.filter(
    //   (cursos) => cursos.id !== cursoId
    // );

    carritoHTML();
  }
}

// Leer el contenido del html al que le dimos click y extrae la informacion del curso.

function leerDatosCurso(curso) {
  // console.log(curso);

  //Crear un objeto con el contenido del curso actual
  const infoCurso = {
    imagen: curso.querySelector("img").src,
    titulo: curso.querySelector("h4").textContent,
    precio: curso.querySelector(".precio span").textContent,
    id: curso.querySelector("a").getAttribute("data-id"),
    cantidad: 1,
  };

  // Revisa si un elemento ya existe en el carrito
  const existe = articulosCarrito.some((curso) => curso.id === infoCurso.id);
  if (existe) {
    //Actualizamos la cantidad
    const cursos = articulosCarrito.map((curso) => {
      if (curso.id === infoCurso.id) {
        curso.cantidad++;
        return curso;
      } else {
        return curso;
      }
    });
    articulosCarrito = [...cursos];
  } else {
    // Agregamos el curso al carrito
    articulosCarrito = [...articulosCarrito, infoCurso];
  }

  console.log(articulosCarrito);

  carritoHTML();
}

// Muestra el carrito de compras en el HTML

function carritoHTML() {
  // Limpia el HTML
  limpiarHTML();

  // Recorre el carrito y genera el HTML
  articulosCarrito.forEach((curso) => {
    const { imagen, titulo, precio, cantidad, id } = curso;
    const row = document.createElement("tr");
    row.innerHTML = `
    <td>
     <img src="${imagen}" width="100"
    </td>
    <td>${titulo}</td>
    <td>${precio}</td>
    <td>${cantidad}</td>
    <td><a href ="#" class="borrar-curso" data-id="${id}"> X </a></td>
    `;

    // Agrega el HTML del carrito en el tbody
    contenedorCarrito.appendChild(row);
  });
}

// Elimina los cursos del tbody

function limpiarHTML() {
  while (contenedorCarrito.firstChild) {
    contenedorCarrito.removeChild(contenedorCarrito.firstChild);
  }
}
