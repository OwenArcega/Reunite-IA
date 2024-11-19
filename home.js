document.addEventListener("DOMContentLoaded", () => {
  if (sessionStorage.getItem("logged") != "true") {
    alert("Por favor inicie sesión.");
    window.location = "pruebalogin.html";
  }

  const menuToggle = document.getElementById("menu-toggle");
  const menuList = document.getElementById("menu-list");
  console.log(sessionStorage.getItem("userId"));

  menuToggle.addEventListener("click", () => {
    menuList.classList.toggle("active");
  });
});
