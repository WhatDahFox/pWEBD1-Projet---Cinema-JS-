/* ==============================================
1. Gestion du monde sombre / clair
=============================================== */

const themeButton = document.querySelector("#theme_button");
const themeIcon = document.querySelector(".theme_icon");
const themeText = document.querySelector(".theme_text");

// Conservation du thème enregistré
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
    document.documentElement.classList.add("theme_light");
}

// Mise à jour du bouton
function updateThemeButton() {
    const isLight = document.documentElement.classList.contains("theme_light");

    themeIcon.textContent = isLight ? "🔆" : "☾";
    themeText.textContent = isLight ? "Jour" : "Nuit";
}

updateThemeButton();

// Changement de thème au clic
themeButton.addEventListener("click", () => {
    document.documentElement.classList.toggle("theme_light");

    const isLight = document.documentElement.classList.contains("theme_light");

    localStorage.setItem("theme", isLight ? "light" : "dark");

    updateThemeButton();
});