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

  let existeImagen = false;

  let myid = sessionStorage.getItem("userId");

  const estadosDeMexico = [
    "Aguascalientes",
    "Baja California",
    "Baja California Sur",
    "Campeche",
    "Chiapas",
    "Chihuahua",
    "Coahuila",
    "Colima",
    "Durango",
    "Guanajuato",
    "Guerrero",
    "Hidalgo",
    "Jalisco",
    "Estado de México",
    "Michoacán de Ocampo",
    "Morelos",
    "Nayarit",
    "Nuevo León",
    "Oaxaca",
    "Puebla",
    "Querétaro",
    "Quintana Roo",
    "San Luis Potosí",
    "Sinaloa",
    "Sonora",
    "Tabasco",
    "Tamaulipas",
    "Tlaxcala",
    "Veracruz",
    "Yucatán",
    "Zacatecas",
    "Ciudad de México",
  ];

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
    let ubicacion = document.getElementById("ubicacion").value.toLowerCase();
    const contactoNombre = document.getElementById("contactoNombre").value;
    const telefono = document.getElementById("telefono").value;
    const email = document.getElementById("email").value;
    const descripcion = document.getElementById("descripcion").value;
    let imagenMostrada = document.getElementById("imagenMostrada").src;

    let encontrado = false;
    ubicacion = ubicacion.toLowerCase();
    encontrado = estadosDeMexico.find((estado) => ubicacion.includes(estado.toLowerCase()));

    if (!encontrado) {
      alert("Agrege un estado a la ubicación.");
      return;
    }

    if (!existeImagen) imagenMostrada = "";
    const mimePrefixRegex = /^data:image\/[a-zA-Z]+;base64,/;

    imagenMostrada = imagenMostrada.replace(mimePrefixRegex, "");

    if (
      !!nombre &&
      !!especie &&
      !!raza &&
      !!color &&
      !isNaN(edad) &&
      !!sexo &&
      !!ubicacion &&
      !!contactoNombre &&
      !!telefono &&
      !!email &&
      !!descripcion
    ) {
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
          imagen: imagenMostrada,
          descripcion: descripcion,
          id_usuario: myid,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        mode: "cors",
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "ok") {
            alert("Mascota guardada correctamente");
          } else {
            console.log(data.error);
            alert("Error al guardar la mascota");
          }
          limpiarFormulario();
        });
    } else {
      alert("Por favor llene todos los campos.");
    }
  });

  // Función para limpiar el formulario
  function limpiarFormulario() {
    const inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
      inputs[i].value = "";
    }
    document.getElementById("descripcion").value = "";
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

  const imageInput = document.getElementById("imageInput");
  const nombre = document.getElementById("nombre");
  const especie = document.getElementById("especie");
  const raza = document.getElementById("raza");
  const color = document.getElementById("color");
  const edad = parseInt(document.getElementById("edad"));
  const sexo = document.getElementById("sexo");
  const ubicacion = document.getElementById("ubicacion");
  const contactoNombre = document.getElementById("contactoNombre");
  const telefono = document.getElementById("telefono");
  const email = document.getElementById("email");

  imageInput.addEventListener("change", async () => {
    const file = imageInput.files[0];
    if (!file) return;
    const imagen = await readFileAsBase64(file);
    const response = await fetch("https://nodetest-p2ot.onrender.com/obtenerInfo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        imagen: imagen,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        try {
          updateInputFields(data);
        } catch (parseError) {
          console.error("Error parsing JSON:", parseError, data);
        }
      });
  });

  function readFileAsBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result.split(",")[1]);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });
  }

  function updateInputFields(dataObj) {
    nombre.value = dataObj["nombre"] || "";
    especie.value = dataObj["especie"] || "";
    raza.value = dataObj["raza"] || "";
    sexo.value = dataObj["sexo"] || "";
    color.value = dataObj["color"] || "";
    edad.value = dataObj["edad"] || "";
    ubicacion.value = dataObj["localización"] || dataObj["dirección"] || "";
    contactoNombre.value = dataObj["nombre_del_contacto_del_dueño"] || "";
    telefono.value = dataObj["teléfono"] || "";
    email.value = dataObj["correo_electrónico"] || "";
  }
});
