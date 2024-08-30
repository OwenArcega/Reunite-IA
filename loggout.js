document.addEventListener("DOMContentLoaded", () => {
  const loggoutBtn = document.getElementById("loggoutBtn");
  loggoutBtn.addEventListener("click", () => {
    sessionStorage.clear();
    window.location = "index.html";
  });
});
