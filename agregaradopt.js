// Variable global para almacenar los datos de mascotas
let mascotasadoptadas = JSON.parse(localStorage.getItem('mascotasadoptadas')) || [];


let users = JSON.parse(localStorage.getItem('users')) || [];

let myid = localStorage.getItem('myide');
console.log(myid); // Imprime: "Hola, mundo!"
var myinfo;
console.log(typeof [])

for(i=0; i < users.length; i++){
  if(users[i].id == myid){
    console.log(users[i])
    myinfo = users[i]
  }
}

// Función para guardar las mascotas en el JSON
function guardarMascotas() {
    fetch('mascotasadoptadas.json', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(mascotasadoptadas),
    })
      .then(() => {
        console.log('Mascotas guardadas con éxito');
        localStorage.setItem('mascotasadoptadas', JSON.stringify(mascotasadoptadas));
      })
      .catch((error) => {
        console.error('Error al guardar mascotas:', error);
      });
  }

// Función para agregar una mascota
const agregarMascotaBtn = document.getElementById("agregarMascotaBtn");
agregarMascotaBtn.addEventListener("click", (e) => {
  e.preventDefault();
  const nombre = document.getElementById("nombre").value;
  const especie = document.getElementById("especie").value;
  const raza = document.getElementById("raza").value;
  const color = document.getElementById("color").value;
  const edad = parseInt(document.getElementById("edad").value);
  const sexo = document.getElementById("sexo").value;
  const ubicacion = document.getElementById("ubicacion").value;
  const contactoNombre = document.getElementById("contactoNombre").value;
  const telefono = document.getElementById("telefono").value;
  const email = document.getElementById("email").value;
  const imagenInput = document.getElementById("imageInput");

  const imagenMostrada = document.getElementById("imagenMostrada");
  const file = imagenInput.files[0];

  if (file) {
    const reader = new FileReader();

    reader.onload = (e) => {
      imagenMostrada.src = e.target.result;
    };

    reader.readAsDataURL(file);
  } else {
    imagenMostrada.src = "";
  }

  const descripcion = document.getElementById("descripcion").value;

  if (
    nombre &&
    especie &&
    raza &&
    color &&
    !isNaN(edad) &&
    ubicacion &&
    contactoNombre &&
    telefono &&
    email &&
    descripcion
  ) {
    const imagenSeleccionadaURL = document.getElementById("imagenMostrada").src;

    fetch("https://nodetest-p2ot.onrender.com/publicarImagen", {
      method: "POST",
      body: JSON.stringify({
        imagen: "vacio",
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.status == "ok") {
          fetch("https://nodetest-p2ot.onrender.com/registrarAdopcion", {
            method: "POST",
            body: JSON.stringify({
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
              imagen: "vacio",
              descripcion: descripcion,
            }),
            headers: {
              "Content-Type": "application/json",
            },
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data.status);
            });
        } else if (data.status == "error") {
          alert(data.error);
        }
      });
  } else {
    // Si no se selecciona ningún archivo, se muestra una imagen vacía o un mensaje
    source = "";
    imagenMostrada.src = "";
  }
});

// Función para limpiar el formulario
function limpiarFormulario() {
    document.getElementById('nombre').value = '';
    document.getElementById('especie').value = '';
    document.getElementById('raza').value = '';
    document.getElementById('color').value = '';
    document.getElementById('edad').value = '';
    document.getElementById('sexo').value = 'Macho';
    document.getElementById('ubicacion').value = '';
    document.getElementById('contactoNombre').value = '';
    document.getElementById('telefono').value = '';
    document.getElementById('email').value = '';
    document.getElementById('imagen').value = '';
    document.getElementById('descripcion').value = '';
  
    }

    function mostrarImagen() {
        var imagen = document.getElementById("imagen").files[0];
        var reader = new FileReader();
        reader.onload = function(e) {
          document.getElementById("imagenMostrada").src = e.target.result;
          document.getElementById("imagenMostrada").style.display = "block";
          document.querySelector("label[for='imagen']").style.display = "none";
        };
        reader.readAsDataURL(imagen);
      }


      const imageInput = document.getElementById('imageInput');
      const nombre = document.getElementById('nombre');
      const especie = document.getElementById('especie');
      const raza = document.getElementById('raza');
      const color = document.getElementById('color');
      const edad = parseInt(document.getElementById('edad'));
      const sexo = document.getElementById('sexo');
      const ubicacion = document.getElementById('ubicacion');
      const contactoNombre = document.getElementById('contactoNombre');
      const telefono = document.getElementById('telefono');
      const email = document.getElementById('email');
    
      imageInput.addEventListener('change', async () => {
        const file = imageInput.files[0];
        if (!file) return;
        const imagen = await readFileAsBase64(file);
        const requestBody = {
          "contents": [
            {
              "parts": [
                {
                  "text": "dame los siguientes datos si los encuentras en el póster: nombre, especie, raza, color, edad, sexo, localización o dirección en donde se perdió, nombre del contacto del dueño, teléfono y correo electrónico. Ten en cuenta los sinonimos de estas. Si no encuentras todos los datos, pásame los que encuentres. Dame la respuesta en JSON con los siguientes campos: nombre, especie, raza, color, edad, sexo, localización, nombre_del_contacto_del_dueño, teléfono y correo_electrónico."
                },
                {
                  "inlineData": {
                    "mimeType": "image/jpeg",
                    "data": `${imagen}`,
                  }
                }
              ]
            }
          ]
        };
    
        try {
          const response = await fetch(
            'https://generativelanguage.googleapis.com/v1/models/gemini-pro-vision:generateContent?key=AIzaSyBL_T0hSOEMgDWAUg9WGOBtZ1q5IUv0Cd0',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(requestBody),
            }
          );
    
          const data = await response.json();
          let result = data.candidates[0].content.parts[0].text;
    
          // Limpiar posibles caracteres inesperados
          result = result.trim();
          if (result.startsWith('```json')) {
            result = result.replace(/^```json/, '').replace(/```$/, '').trim();
          }
    
          let dataObj;
          try {
            dataObj = JSON.parse(result);
            updateInputFields(dataObj);
          } catch (parseError) {
            console.error('Error parsing JSON:', parseError, result);
          }
        } catch (error) {
          console.error('Error:', error);
        }
      });
    
      function readFileAsBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onload = () => resolve(reader.result.split(',')[1]);
          reader.onerror = reject;
          reader.readAsDataURL(file);
        });
      }
    
      function updateInputFields(dataObj) {
        console.log(dataObj);
        nombre.value = dataObj['nombre'] || '';
        especie.value = dataObj['especie'] || '';
        raza.value = dataObj['raza'] || '';
        sexo.value = dataObj['sexo'] || '';
        color.value = dataObj['color'] || '';
        edad.value = dataObj['edad'] || '';
        ubicacion.value = dataObj['localización'] || dataObj['dirección'] || '';
        contactoNombre.value = dataObj['nombre_del_contacto_del_dueño'] || '';
        telefono.value = dataObj['teléfono'] || '';
        email.value = dataObj['correo_electrónico'] || '';
      }
      
    
    