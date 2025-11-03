const hamburger = document.getElementById("hamburger");
const mainNav = document.querySelector("#mainNav ul");

hamburger.addEventListener("click", () => {
  mainNav.classList.toggle("show");
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");
    const filter = button.getAttribute("data-filter");
    displayCourses(filter);
  });
});

