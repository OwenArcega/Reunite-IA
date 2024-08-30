document.addEventListener('DOMContentLoaded', () => {
  if (sessionStorage.getItem("logged") != "true") {
    alert("Por favor incie sesión.");
    window.location = "pruebalogin.html";
  }

  const menuToggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");

  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });

  const misPublicacionesBtn = document.getElementById('misPublicacionesBtn');
  
  misPublicacionesBtn.addEventListener('click', () => {
    window.location.href = "./mispubli.html";
  })

  let mascotas = [];

  let userId = sessionStorage.getItem('userId');

  // Función para cargar las mascotas desde el JSON y mostrarlas
  function cargarMascotas() {
    fetch("https://nodetest-p2ot.onrender.com/obtenerPerdidas", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        mascotas = data.body;
        mostrarMascotas();
      })
      .catch(error => {
        console.error("Error: " + error);
        alert("Error al cargar mascotas");
      })
  }

  const buscarBtn = document.getElementById('buscarBtn');
  buscarBtn.addEventListener('click', () => {
    mostrarMascotas();
  })

  // Función para mostrar la lista de mascotas
  function mostrarMascotas() {
    const listaMascotas = document.getElementById('listaMascotas');
    listaMascotas.innerHTML = '';
    const filtroBusqueda = document.getElementById('busqueda').value.toLowerCase();

    mascotas
      .filter((mascota) => {
        return mascota.nombre.toLowerCase().includes(filtroBusqueda);
      })
      .forEach((mascota) => {
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
        listaMascotas.appendChild(divMascota);
        document.getElementById(`mascota-${mascota.id}`).addEventListener('click', () => verDetalles(mascota.id));
      });
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
      imagenMostrada.src = '';
    }
  }

  function verDetalles(id) {
    window.location.href = `detalles.html?id=${id}`;
  }
  
  cargarMascotas();
});