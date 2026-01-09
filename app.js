document.addEventListener("DOMContentLoaded", () => {
  const btn = document.getElementById("themeToggle");
  const key = "pca_theme";

  function setTheme(t){
    if(t === "light"){
      document.body.classList.add("light");
      if(btn) btn.textContent = "☀️";
    }else{
      document.body.classList.remove("light");
      if(btn) btn.textContent = "🌙";
    }
  }

  setTheme(localStorage.getItem(key) || "dark");

  if(btn){
    btn.addEventListener("click", () => {
      const next = document.body.classList.contains("light") ? "dark" : "light";
      localStorage.setItem(key, next);
      setTheme(next);
    });
  }
});
