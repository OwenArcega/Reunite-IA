document.addEventListener("DOMContentLoaded", function () {
  const estadosDeMexico = ["Aguascalientes", "Baja California", "Baja California Sur", "Campeche", "Chiapas", "Chihuahua", "Coahuila", "Colima", "Durango", "Guanajuato", "Guerrero", "Hidalgo", "Jalisco", "Estado de México","Estado de Mexico" , "Michoacán de Ocampo","Michoacan de Ocampo","Morelos", "Nayarit", "Nuevo León","Nuevo Leon","Oaxaca", "Puebla", "Querétaro","Queretaro", "Quintana Roo", "San Luis Potosí","San Luis Potosi", "Sinaloa", "Sonora", "Tabasco", "Tamaulipas", "Tlaxcala", "Veracruz", "Yucatán","Yucatan", "Zacatecas", "Ciudad de México","Ciudad de Mexico","CDMX"];

    const urlParams = new URLSearchParams(window.location.search);
  const id = urlParams.get("id");
  const userId = sessionStorage.getItem('userId');
    let mascota;
  
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
          mascota = data.body[0];
          llenarDatos(mascota);
        } else {
          const detallesMascota = document.getElementById("detallesMascota");
        detallesMascota.textContent = "Mascota no encontrada.";
          console.log(data.error);
        }
      });
          
      function llenarDatos(mascota) {
              const tiposDeDatos = {
                nombre: 'text',
                raza: 'text',
                especie: 'text',
                color: 'text',
                edad: 'number',
                sexo: 'text',
                ubicacion: 'text',
                contactoNombre: 'text',
                telefono: 'text',
                email: 'text',
                descripcion: 'text'
              };
          
        for (const propiedad in mascota) {
          if (propiedad == "id" || propiedad == "id_usuario") {
          } else {
            if (mascota.hasOwnProperty(propiedad)) {
              const valor = mascota[propiedad];
              const tipoDeDato = tiposDeDatos[propiedad] || 'text';
          
              if (propiedad.toLowerCase() === 'contacto') {
                const label = document.createElement("label")
                label.textContent = "Contacto"
                div2.appendChild(label)
                for (const info in valor) {
                  const info_label = document.createElement('label')
                  info_label.textContent = info
                  div2.appendChild(info_label)

                  const input_info = document.createElement("input");
                  input_info.type = "text";
                  input_info.value = mascota['contacto'][info]
                  input_info.disabled = true;
                  if (info === "nombre") {
                    input_info.id = "contactoNombre"
                  } else {
                    input_info.id = info;
                  }
                  div2.appendChild(input_info)
                }
              } else {
                const label = document.createElement("label");
                label.textContent = propiedad.charAt(0).toUpperCase() + propiedad.slice(1); // Capitaliza el nombre de la propiedad
            
                const input = document.createElement("input");
                input.type = tipoDeDato;
                input.value = valor;
                input.disabled = true;
                input.id = propiedad;
            
                // Agregar el label y el input al contenedor en la página detalles.html
                if (propiedad === "imagen") {
                  const image = document.createElement('img')
                  image.src = valor
                  image.id = "imagen"
                  div1.appendChild(image)

                  input.type = "file"
                  input.id = "imagenInput"
                  input.accept = "image/*"
                  div1.appendChild(input)
                } else {
                  div2.appendChild(label);
                  div2.appendChild(input);
                }
              }
            }
          }
        }
              var map = L.map('map').setView([0, 0], 14); // Establece la ubicación inicial y el nivel de zoom

      // Agrega un mapa base
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      }).addTo(map);

      // Agrega un marcador
      var marker = L.marker([0, 0]).addTo(map);

  fetch('https://nominatim.openstreetmap.org/search?format=json&q=' + mascota.ubicacion)
      .then(response => response.json())
      .then(data => {
          if (data.length > 0) {
              var latlng = [parseFloat(data[0].lat), parseFloat(data[0].lon)];
              marker.setLatLng(latlng);
              map.setView(latlng, 12); // Ajusta el mapa y el marcador a la ubicación
          } else {
              alert("No se pudo encontrar la dirección en el mapa.");
          }
      })
      .catch(error => {
          console.error("Error al geocodificar la dirección:", error);
          alert("Ocurrió un error al geocodificar la dirección.");
     });
    }

    
    document.getElementById("eliminar").addEventListener("click", () => {
      eliminarMascota(id);
  });

  function eliminarMascota(id) {
    fetch("https://nodetest-p2ot.onrender.com/eliminarPerdida", {
      method: "DELETE",
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
          alert("Mascota eliminada correctamente")
          window.location.href = "/mispubli.html"
        } else {
          console.log(data.error);
        }
      });
}

document.getElementById("modificar_publicacion").addEventListener('click',() => {
  modificarPublicacion(id)
})

const btn_guardar_cambios = document.getElementById('btn_guardar_cambios')
btn_guardar_cambios.addEventListener('click',()=>{

  const nombre = document.getElementById('nombre').value;
  const especie = document.getElementById('especie').value;
  const raza = document.getElementById('raza').value;
  const color = document.getElementById('color').value;
  const edad = parseInt(document.getElementById('edad').value);
  const sexo = document.getElementById('sexo').value;
  let ubicacion = document.getElementById('ubicacion').value.toLowerCase();
  const contactoNombre = document.getElementById("nombreContacto").value;
  const telefono = document.getElementById('telefonoContacto').value;
  const email = document.getElementById('correoContacto').value;
  const imagen = document.getElementById('imagen').src;
  const descripcion = document.getElementById('descripcion').value;

if (imagen.src == "") {
  alert("Por favor agregue una imagen.");
  return;
}

let encontrado = false;
encontrado = estadosDeMexico.find((estado) =>
  ubicacion.includes(estado.toLowerCase())
);

if (!encontrado) {
  alert("Agrege un estado de la república a la ubicación.");
  return;
}

  if (nombre && especie && raza && color && !isNaN(edad) && ubicacion && contactoNombre && telefono && email && descripcion) {

    fetch("https://nodetest-p2ot.onrender.com/modificarPerdida", {
      method: "PATCH",
      body: JSON.stringify({
        id: mascota.id,
        nombre: nombre,
        especie: especie,
        raza: raza,
        color: color,
        edad: edad,
        sexo: sexo,
        ubicacion: ubicacion,
        nombreContacto: contactoNombre,
        telefonoContacto: telefono,
        correoContacto: email,
        imagen: imagen,
        descripcion: descripcion,
        id_usuario: userId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          alert("Mascota modificada correctamente");
          window.location.href = "/mispubli.html";
        } else {
          alert("Error al modificar mascota")
          console.log(data.error);
        }
      });
} else {
    alert('Por favor, completa todos los campos.');
}

})

function modificarPublicacion(){
  let children = div2.children
  for(let i = 0; i < children.length; i++){
    if(children[i].tagName.toLowerCase() === "input"){
        children[i].disabled = false
    }
    imagenInput.addEventListener('change', mostrarImagen)
  }

  div1.children[1].disabled = false
  btn_guardar_cambios.hidden = false;
}

const mostrarImagen = function(event) {
  var imagen = document.getElementById("imagen");
  imagen.src = URL.createObjectURL(event.target.files[0])
}

});



  