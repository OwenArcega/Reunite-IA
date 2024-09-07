document.addEventListener("DOMContentLoaded", () => {
  const registerButton = document.getElementById("register");
  const loginButton = document.getElementById("login");
  const container = document.getElementById("container");

  registerButton.addEventListener("click", () => {
    container.classList.add("right-panel-active");
  });

  loginButton.addEventListener("click", () => {
    container.classList.remove("right-panel-active");
  });

  const btnReg = document.getElementById("btnRegister");
  btnReg.addEventListener("click", (e) => {
    e.preventDefault();

    let newUsername = document.getElementById("newUsername").value;
    let newEmail = document.getElementById("newEmail").value;
    let newPassword = document.getElementById("newPassword").value;

    fetch("https://nodetest-p2ot.onrender.com/registrarUsuario", {
      method: "POST",
      body: JSON.stringify({
        usuario: newUsername,
        correo: newEmail,
        contrasena: newPassword,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "error") {
          alert("Error: " + data.error);
        } else {
          alert("Usuario registrado con éxito!");
        }
      });
  });

  const btnLog = document.getElementById("btnLogin");
  btnLog.addEventListener("click", (e) => {
    e.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;

    fetch("https://nodetest-p2ot.onrender.com/login", {
      method: "POST",
      body: JSON.stringify({
        nombre: username,
        contrasena: password,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.status == "ok") {
          console.log(data);
          sessionStorage.setItem("userId", data.body[0].id);
          sessionStorage.setItem("logged", "true");
          // window.location.href = "home.html";
        } else {
          alert("Usuario no encontrado");
        }
      });
  });
});
