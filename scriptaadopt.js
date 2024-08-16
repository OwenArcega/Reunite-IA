// Variable global para almacenar los datos de mascotas
let mascotasadoptadas = [];


// Función para cargar las mascotas desde el JSON y mostrarlas
function cargarMascotas() {
  const mascotasGuardadas = localStorage.getItem('mascotasadoptadas');
  fetch("https://nodetest-p2ot.onrender.com/obtenerAdopcion", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      mascotasadoptadas = data.body;
      mostrarMascotas();
    })
    .catch((error) => {
      console.error("Error: " + error);
      alert("Error al cargar mascotas");
    });
  }


// Función para mostrar la lista de mascotas
function mostrarMascotas() {
  const listaMascotas = document.getElementById('listaMascotas');
  listaMascotas.innerHTML = '';

  const filtroBusqueda = document.getElementById('busqueda').value.toLowerCase();

  mascotasadoptadas
    .filter((mascotasadoptadas) => {
      // Filtrar mascotas que coincidan con el criterio de búsqueda
      return mascotasadoptadas.nombre.toLowerCase().includes(filtroBusqueda);
    })
    .forEach((mascotasadoptadas) => {
      const divMascota = document.createElement('div');
      divMascota.classList.add('mascota-container'); // Agrega la clase al div
      divMascota.innerHTML = `
        <div class="profile profile-imgonly">
          <div class="profile__image">
            <img src="${mascotasadoptadas.imagen}" alt="Imagen de la mascota">
          </div>
          <div class="profile__info">
            <h3>${mascotasadoptadas.nombre}</h3>
          </div>
          <div class="profile__cta"><a class="button" onclick="verDetalles(${mascotasadoptadas.id})">Detalles</a></div>
        </div>
      `;
      listaMascotas.appendChild(divMascota); // Agrega el div de la mascota directamente al contenedor
    });
}

function buscarMascotas() {
  mostrarMascotas(); // Esto activará el filtro al hacer clic en el botón de búsqueda
}
  function mostrarImagen() {
    const imagenInput = document.getElementById('imagen');
    const imagenMostrada = document.getElementById('imagenMostrada');
    const file = imagenInput.files[0];
  
    if (file) {
      const reader = new FileReader();
  
      reader.onload = (e) => {
        imagenMostrada.src = e.target.result;
      };
  
      reader.readAsDataURL(file);
    } else {
      // Si no se selecciona ningún archivo, se muestra una imagen vacía o un mensaje
      imagenMostrada.src = '';
    }
  }

  function verDetalles(id) {
    window.location.href = `detallesadopt.html?id=${id}`;
  }
  cargarMascotas();