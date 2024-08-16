// Variable global para almacenar los datos de mascotas
let mascotas = JSON.parse(localStorage.getItem('mascotas')) || [];

let users = JSON.parse(localStorage.getItem('users')) || [];

let myid = localStorage.getItem('myide');

let existeImagen = false;

// Función para agregar una mascota
const agregarMascotaBtn = document.getElementById("agregarMascotaBtn");
agregarMascotaBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const nombre = document.getElementById('nombre').value;
  const especie = document.getElementById('especie').value;
  const raza = document.getElementById('raza').value;
  const color = document.getElementById('color').value;
  const edad = parseInt(document.getElementById('edad').value);
  const sexo = document.getElementById('sexo').value;
  const ubicacion = document.getElementById('ubicacion').value;
  const contactoNombre = document.getElementById('contactoNombre').value;
  const telefono = document.getElementById('telefono').value;
  const email = document.getElementById('email').value;
  const descripcion = document.getElementById("descripcion").value;
  let imagenMostrada = document.getElementById('imagenMostrada').src;
  
  if (!existeImagen) imagenMostrada = "";
  imagenMostrada = imagenMostrada.slice(23, -1);
  console.log(imagenMostrada)
  if (!!nombre && !!especie && !!raza && !!color && !isNaN(edad) && !!sexo && !!ubicacion && !!contactoNombre && !!telefono && !!email && !!descripcion) {
      fetch("https://nodetest-p2ot.onrender.com/registrarPerdida", {
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
          imagen: imagenMostrada,
          descripcion: descripcion,
          id_usuario: myid
        }),
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*"
        },
        mode: "cors"
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          limpiarFormulario()
          alert("Mascota guardada correctamente");
        });
  } else {
    source = "";
    imagenMostrada.src = "";
  }
})


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
      reader.onload = function (e) {
          document.getElementById("imagenMostrada").src = e.target.result;
          document.getElementById("imagenMostrada").style.display = "block";
          document.querySelector("label[for='imagen']").style.display = "none";
        };
      reader.readAsDataURL(imagen);
      existeImagen = true;
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
  

