document.addEventListener("DOMContentLoaded", function () {
    // Obtener el ID de la mascota de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id");
  
    fetch("https://nodetest-p2ot.onrender.com/obtenerMascotaAdopcion", {
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

  
    function llenarDatos(mascotaadop) {
  
      const imagen = document.getElementById("imagenMostrada");
      imagen.src = mascotaadop.imagen;
      imagen.alt = "Imagen de la mascota";
  
      const nombreRaza = document.createElement("p");
      nombreRaza.textContent = `Name: ${mascotaadop.nombre}, Breed: ${mascotaadop.raza}`;
  
      const especie = document.createElement("p");
      especie.textContent = `Specie: ${mascotaadop.especie}`;
  
      const color = document.createElement("p");
      color.textContent = `Color: ${mascotaadop.color}`;
  
      const edad = document.createElement("p");
      edad.textContent = `Age: ${mascotaadop.edad} years`;
  
      const sexo = document.createElement("p");
      sexo.textContent = `Sex: ${mascotaadop.sexo}`;
  
      const ubicacion = document.createElement("p");
      ubicacion.textContent = `Location: ${mascotaadop.ubicacion}`;
  
      const contacto = document.createElement("p");
      contacto.textContent = `Contact: ${mascotaadop.nombreContacto}, Cellphone: ${mascotaadop.telefonoContacto}, Email: ${mascotaadop.correoContacto}`;
  
      const descripcion = document.createElement("p");
      descripcion.textContent = `Description: ${mascotaadop.descripcion}`;
  
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

      var map = L.map('map').setView([0, 0], 14); // Establece la ubicación inicial y el nivel de zoom

      // Agrega un mapa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Agrega un marcador
      var marker = L.marker([0, 0]).addTo(map);

      // Función para mostrar la dirección en el mapa
    
  // Utiliza la API de geocodificación de OpenStreetMap
  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + mascotaadop.ubicacion)
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              var latlng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
              marker.setLatLng(latlng);
            map.setView(latlng, 12); // Ajusta el mapa y el marcador a la ubicación
            console.log(data)
          } else {
              alert("No hemos podido encontrar a tu mascota.");
          }
      })
      .catch(error => {
          console.error("Error al geocodificar la dirección:", error);
          alert("Dirección errónea.");
     });
    }
  });



  