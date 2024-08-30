document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem("logged") != "true") {
    alert("Por favor incie sesión.");
    window.location = "pruebalogin.html";
  }

  const agregarBtn = document.getElementById('agregarBtn');
  agregarBtn.addEventListener('click', () => {
    window.location = "agregaradopt.html";
  })

  const menuToggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");

  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });

  let myid = localStorage.getItem('myide');
  let mascotas = [];

  // Función para cargar las mascotas desde el JSON y mostrarlas
  function cargarMascotas() {
    fetch("https://nodetest-p2ot.onrender.com/obtenerAdopcionUsuario", {
      method: "POST",
      body: JSON.stringify({
        id: myid,
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
          alert("Error cargando registros.");
          console.log(data.error);
        }
      });
  }


  // Función para mostrar la lista de mascotas
  function mostrarMascotas() {
    const listaMascotas = document.getElementById('listaMascotas');
    listaMascotas.innerHTML = ''; // Limpia el contenido anterior

    mascotas.forEach((mascotasadoptadas) => {
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
          <div class="profile__cta"><a id=mascota-${mascotasadoptadas.id} class="button">Detalles</a></div>
          </div>
      `;

      listaMascotas.appendChild(divMascota); // Agrega el div de la mascota directamente al contenedor
      document.getElementById(`mascota-${mascotasadoptadas.id}`).addEventListener("click", () => verDetalles(mascotasadoptadas.id));
    });
  }

  function verDetalles(id) {
    // Redirigir a la página de detalles de la mascota usando el ID
    window.location.href = `detallesmispubliadopt.html?id=${id}`;
  }
  cargarMascotas();
});