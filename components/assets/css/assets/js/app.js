document.addEventListener("DOMContentLoaded", async () => {
  // Inject header/footer
  const headerHost = document.getElementById("siteHeader");
  const footerHost = document.getElementById("siteFooter");

  async function loadInto(host, url){
    if(!host) return;
    const res = await fetch(url, { cache: "no-cache" });
    host.innerHTML = await res.text();
  }

  // IMPORTANT: project base path on GitHub Pages
  const BASE = "/psychoclubacademy";

  await loadInto(headerHost, `${BASE}/components/header.html`);
  await loadInto(footerHost, `${BASE}/components/footer.html`);

  // Theme toggle
  const key = "pca_theme";
  const btn = document.getElementById("themeToggle");

  function apply(theme){
    if(theme === "light"){
      document.body.classList.add("light");
      if(btn) btn.textContent = "☀️";
    }else{
      document.body.classList.remove("light");
      if(btn) btn.textContent = "🌙";
    }
  }

  apply(localStorage.getItem(key) || "dark");
  if(btn){
    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("light") ? "dark" : "light";
      localStorage.setItem(key, next);
      apply(next);
    });
  }

  // Mobile menu
  const burger = document.getElementById("burgerBtn");
  const menu = document.getElementById("mobileMenu");
  if(burger && menu){
    burger.addEventListener("click", () => {
      const isOpen = menu.style.display === "block";
      menu.style.display = isOpen ? "none" : "block";
    });
  }

  // Footer year
  const y = document.getElementById("year");
  if(y) y.textContent = new Date().getFullYear();

  // Courses search (optional)
  const search = document.getElementById("courseSearch");
  if(search){
    const cards = Array.from(document.querySelectorAll("[data-course]"));
    search.addEventListener("input", () => {
      const q = search.value.trim().toLowerCase();
      cards.forEach(el => {
        const text = (el.getAttribute("data-course") || "").toLowerCase();
        el.style.display = text.includes(q) ? "" : "none";
      });
    });
  }
});
