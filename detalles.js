document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("logged") != "true") {
    alert("Por favor incie sesión.");
    window.location = "pruebalogin.html";
  }

  const menuToggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");

  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });

  const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");

  fetch("https://nodetest-p2ot.onrender.com/obtenerMascotaPerdida", {
    method: "POST",
    body: JSON.stringify({
      id: id,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.status == "ok") {
        const mascota = data.body[0];
        llenarDatos(mascota);
      } else {
        console.log(data.error);
      }
    });

  function llenarDatos(mascota) {
    const detallesMascota = document.getElementById("detallesMascota");

    const imagen = document.getElementById("imagenMostrada");
    imagen.src = mascota.imagen;
    imagen.alt = "Imagen de la mascota";

    const nombreRaza = document.createElement("p");
    nombreRaza.textContent = `Nombre: ${mascota.nombre}, Raza: ${mascota.raza}`;

    const especie = document.createElement("p");
    especie.textContent = `Especie: ${mascota.especie}`;

    const color = document.createElement("p");
    color.textContent = `Color: ${mascota.color}`;

    const edad = document.createElement("p");
    edad.textContent = `Edad: ${mascota.edad} año/s`;

    const sexo = document.createElement("p");
    sexo.textContent = `Sexo: ${mascota.sexo}`;

    const ubicacion = document.createElement("p");
    ubicacion.textContent = `Localización: ${mascota.ubicacion}`;

    const contacto = document.createElement("p");
    contacto.textContent = `Contacto: ${mascota.nombreContacto}, Teléfono: ${mascota.telefonoContacto}, Correo: ${mascota.correoContacto}`;

    const descripcion = document.createElement("p");
    descripcion.textContent = `Descripción: ${mascota.descripcion}`;

    // Agregar los elementos al contenedor en la página detalles.html
    div1.appendChild(imagen);
    div2.appendChild(nombreRaza);
    div2.appendChild(especie);
    div2.appendChild(color);
    div2.appendChild(edad);
    div2.appendChild(sexo);
    div2.appendChild(ubicacion);
    div2.appendChild(contacto);
    div2.appendChild(descripcion);

    var map = L.map("map").setView([0, 0], 14); // Establece la ubicación inicial y el nivel de zoom

    // Agrega un mapa base
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Agrega un marcador
    var marker = L.marker([0, 0]).addTo(map);

    fetch(
      "https://nominatim.openstreetmap.org/search?format=json&q=" +
        mascota.ubicacion
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          var latlng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
          marker.setLatLng(latlng);
          map.setView(latlng, 12); // Ajusta el mapa y el marcador a la ubicación
        } else {
          alert("No hemos encontrado tu dirección.");
        }
      })
      .catch((error) => {
        console.error("Error al geocodificar la dirección:", error);
        alert("Dirección erronea.");
      });
  }
});
