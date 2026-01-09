document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");

  function apply(theme) {
    if (theme === "light") {
      document.body.classList.add("light");
      if (btn) btn.textContent = "☀️";
    } else {
      document.body.classList.remove("light");
      if (btn) btn.textContent = "🌙";
    }
  }

  const saved = localStorage.getItem("pca_theme") || "dark";
  apply(saved);

  if (btn) {
    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("light") ? "dark" : "light";
      localStorage.setItem("pca_theme", next);
      apply(next);
    });
  }
});
