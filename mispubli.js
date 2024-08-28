document.addEventListener('DOMContentLoaded', ()=>{
  let mascotas = [];
  let userId = sessionStorage.getItem('userId');

  // Función para cargar las mascotas desde el JSON y mostrarlas
  function cargarMascotas() {
    fetch("https://nodetest-p2ot.onrender.com/obtenerPerdidasUsuario", {
      method: "POST",
      body: JSON.stringify({
        id: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          mascotas = data.body;
          mostrarMascotas();
        } else {
          alert("Error cargando registros.")
          console.log(data.error);
        }
      });

  }

  // Función para mostrar la lista de mascotas
  function mostrarMascotas() {
    const listaMascotas = document.getElementById('listaMascotas');
    listaMascotas.innerHTML = ''; // Limpia el contenido anterior

    mascotas.forEach((mascota) => {
      const divMascota = document.createElement('div');
      divMascota.classList.add('mascota-container'); // Agrega la clase al div

      divMascota.innerHTML = `
          <div class="profile profile-imgonly">
          <div class="profile__image">
          <img src="${mascota.imagen}" alt="Imagen de la mascota">
          </div>
          <div class="profile__info">
          <h3>${mascota.nombre}</h3>
          </div>
          <div class="profile__cta"><a id=mascota-${mascota.id} class="button">Detalles</a></div>
          </div>
      `;

      listaMascotas.appendChild(divMascota); // Agrega el div de la mascota directamente al contenedor
      document.getElementById(`mascota-${mascota.id}`).addEventListener('click', () => verDetalles(mascota.id));
    });
  }

  function verDetalles(id) {
    window.location.href = `detallesmispubli.html?id=${id}`;
  }
  
  const agregarBtn = document.getElementById('agregarBtn');
  agregarBtn.addEventListener('click', () => {
    window.location.href = "./agregar.html";
  })
  cargarMascotas();
});