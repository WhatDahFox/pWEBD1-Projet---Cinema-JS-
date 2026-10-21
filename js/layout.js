/* ==============================================
1. Création du header
============================================== */

const header = document.querySelector("header");

header.innerHTML = `
        <a id="logo" href="index.html">
            <img src="images/logo.png" alt="Cinéma Pathé en croûte - Accueil">
        </a>
        <nav class="menu_header">
            <a href="index.html"> Accueil </a>
            <a href="search.html"> Recherche </a>
        </nav>
        <button type="button" id="theme_button">
                <span class="theme_icon"> 🔆 </span>
                <span class="theme_text"> Jour </span>
        </button>
`;

/* ==============================================
2. Création du footer
============================================== */

const footer = document.querySelector("footer");

footer.innerHTML = `
        <nav class="menu_footer">
            <h2> Navigation </h2>
            <a href="index.html"> Accueil </a>
            <a href="search.html"> Recherche </a>
        </nav>
        <div class="informations">
            <h2> Informations </h2>
            <p> © Site réalisé par Nathan RENARD & Roland BOURDILLON.
                <br> Tous droits réservés. </p>
        </div>
`;