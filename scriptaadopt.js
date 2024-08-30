document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("logged") != "true") {
    alert("Por favor incie sesión.");
    window.location = "pruebalogin.html";
  }

  // Variable global para almacenar los datos de mascotas
  let mascotasadoptadas = [];

  const btnMisMascotas = document.getElementById("misMascotas");
  btnMisMascotas.addEventListener('click', () => {
    window.location = "./mispublicadopt.html"
  })

  // Función para cargar las mascotas desde el JSON y mostrarlas
  function cargarMascotas() {
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
          <div class="profile__cta"><a id=mascota-${mascotasadoptadas.id} class="button">Detalles</a></div>
        </div>
      `;
        listaMascotas.appendChild(divMascota); // Agrega el div de la mascota directamente al contenedor
        document.getElementById(`mascota-${mascotasadoptadas.id}`).addEventListener("click", () => verDetalles(mascotasadoptadas.id));

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
  
  document.getElementById("open-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "flex";
  });

  document.getElementById("close-popup").addEventListener("click", function () {
    document.getElementById("popup").style.display = "none";
  });

  const form = document.getElementById("questionnaire");
  const nextBtn = document.getElementById("next-btn");
  const prevBtn = document.getElementById("prev-btn");
  const submitBtn = document.getElementById("submit-btn");

  let currentStep = 0;
  const steps = document.querySelectorAll(".question");

  nextBtn.addEventListener("click", function () {
    if (validarPregunta()) {
      currentStep++;
      updateForm();
    }
  });

  prevBtn.addEventListener("click", function () {
    currentStep--;
    updateForm();
  });

  form.addEventListener("submit", function (event) {
    event.preventDefault();
    if (validarFormulario()) {
      alert("Respuesta registrada");
      form.reset();
      document.getElementById("popup").style.display = "none";
      currentStep = 0;
      updateForm();
    }
  });

  function updateForm() {
    steps.forEach((step, index) => {
      step.style.display = index === currentStep ? "block" : "none";
    });

    prevBtn.disabled = currentStep === 0;
    nextBtn.style.display =
      currentStep === steps.length - 1 ? "none" : "inline-block";
    submitBtn.style.display =
      currentStep === steps.length - 1 ? "inline-block" : "none";
  }

  function validarPregunta() {
    const step = steps[currentStep];
    const select = step.querySelector("select");
    const radios = step.querySelectorAll('input[type="radio"]');
    const error = step.querySelector(".error");

  
    if (select) {
      if (select.value === "") {
        error.style.display = "block";
        return false;
      } else {
        error.style.display = "none";
        return true;
      }
    } else if (radios.length > 0) {
      const radioChecked = Array.from(radios).some((radio) => radio.checked);
      if (!radioChecked) {
        error.style.display = "block";
        return false;
      } else {
        error.style.display = "none";
        return true;
      }
    }
    return true;
  }

  function validarFormulario() {
    let esValido = true;
    const respuestas = [];

    steps.forEach((step, index) => {
      const select = step.querySelector("select");
      const radios = step.querySelectorAll('input[type="radio"]');
      const error = step.querySelector(".error");

      if (select) {
        if (select.value === "") {
          error.style.display = "block";
          esValido = false;
        } else {
          error.style.display = "none";
          respuestas[index] = select.value;
        }
      } else if (radios.length > 0) {
        const radioChecked = Array.from(radios).some((radio) => radio.checked);
        if (!radioChecked) {
          error.style.display = "block";
          esValido = false;
        } else {
          error.style.display = "none";
          respuestas[index] = Array.from(radios).find(
            (radio) => radio.checked
          ).value;
        }
      }
    });

    if (esValido) {
      respuestas[1] = `tiempo_disponible: ${respuestas[1]}`;
      respuestas[2] = `estilo_de_vida: ${respuestas[2]}`;
      respuestas[3] = `vive_con: ${respuestas[3]}`;
      respuestas[4] = `alergias: ${respuestas[4]}`;
      respuestas[5] = `tamano_mascota_preferido: ${respuestas[5]}`;
      fetch("https://nodetest-p2ot.onrender.com/mascotaIdeal", {
        method: "POST",
        body: JSON.stringify({
          answers: respuestas,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.status == "error") {
            console.log("Error: " + data.error + ". " + data.details);
          } else {
            let mascota = data.data;
            const listaMascotas = document.getElementById("listaMascotas");
            listaMascotas.innerHTML = "";

            const divMascota = document.createElement("div");
            divMascota.classList.add("mascota-container"); // Agrega la clase al div
            divMascota.innerHTML = `
        <div class="profile profile-imgonly">
          <div class="profile__image">
            <img src="${mascota[0].imagen}" alt="Imagen de la mascota">
          </div>
          <div class="profile__info">
            <h3>${mascota[0].nombre}</h3>
          </div>
          <div class="profile__cta"><a class="button" onclick="verDetalles(${mascota[0].id})">Detalles</a></div>
        </div>
      `;
            listaMascotas.appendChild(divMascota); // Agrega el div de la mascota directamente al contenedor
          }
        })
    }

    return esValido;
  }

  updateForm();
});