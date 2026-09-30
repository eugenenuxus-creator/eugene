const header = document.getElementById("header");
const navLinks = document.getElementById("navLinks");
const menuToggle = document.getElementById("menuToggle");
const themeToggle = document.getElementById("themeToggle");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

window.addEventListener("scroll", () => {
  header.classList.toggle("scrolled", window.scrollY > 30);
});

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const icon = menuToggle.querySelector("i");
  icon.classList.toggle("fa-bars");
  icon.classList.toggle("fa-xmark");
});

document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    const icon = menuToggle.querySelector("i");
    icon.classList.add("fa-bars");
    icon.classList.remove("fa-xmark");
  });
});

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  const icon = themeToggle.querySelector("i");
  const isLight = document.body.classList.contains("light");
  icon.classList.toggle("fa-moon", !isLight);
  icon.classList.toggle("fa-sun", isLight);
  localStorage.setItem("eugene-theme", isLight ? "light" : "dark");
});

if (localStorage.getItem("eugene-theme") === "light") {
  document.body.classList.add("light");
  themeToggle.querySelector("i").classList.replace("fa-moon", "fa-sun");
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

const sections = document.querySelectorAll("section[id]");
const navItems = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 180) current = section.id;
  });

  navItems.forEach(item => {
    item.classList.toggle("active", item.getAttribute("href") === `#${current}`);
  });
});

const cursorGlow = document.querySelector(".cursor-glow");
window.addEventListener("mousemove", (e) => {
  cursorGlow.style.left = `${e.clientX}px`;
  cursorGlow.style.top = `${e.clientY}px`;
});
