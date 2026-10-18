/* ==============================================
0. Importation des fonctions
=============================================== */

import { requestById } from "./api.js";

/* ==============================================
1. Récupérer le paramètre ID de l'URL
=============================================== */

const urlParams = new URLSearchParams(window.location.search);
const imdbId = urlParams.get('id');

try {
    /* ==============================================
    2. Récupérer la fiche complète OMDb depuis imdbId
    =============================================== */

    if (!imdbId || !/^tt\d+$/.test(imdbId)) {         // /^tt\d+$/ : expression régulière (RegExp) qui vérifie que l'identifiant commence par tt et se poursuit uniquement avec des chiffres
        throw new Error("Film introuvable");
    }

    const movie = await requestById(imdbId, "full");

    /* ==============================================
    3. Afficher les éléments du film
    =============================================== */

    const movieTitle = document.querySelector("#movie_title");
    const movieYear = document.querySelector("#movie_year");
    const moviePoster = document.querySelector("#movie_poster");
    const movieGenre = document.querySelector("#movie_genre");
    const movieActors = document.querySelector("#movie_actors");
    const movieSummary = document.querySelector("#movie_summary");
    const movieDvd = document.querySelector("#movie_dvd");
    const movieRatings = document.querySelector("#movie_ratings");
    const movieStatus = document.querySelector("#movie_status");

    movieTitle.textContent = movie.title;
    movieYear.textContent = movie.year;

    // Affiche de remplacement
    moviePoster.onerror = () => {
        moviePoster.onerror = null;
        moviePoster.src = "./images/affiche_indisponible.png";
    };
    //Affiche du film
    moviePoster.src = movie.poster !== "N/A"
        ? movie.poster
        : "./images/affiche_indisponible.png";
    moviePoster.alt = `Affiche du film ${movie.title}`;

    movieGenre.textContent = movie.genre;
    movieActors.textContent = movie.actors;
    movieSummary.textContent = movie.plot;
    movieDvd.textContent = movie.dvd === "Non Renseigné"
        ? "Non renseigné"
        : new Date(movie.dvd).toLocaleDateString("fr-FR");
    movieRatings.replaceChildren();
    if (movie.ratings.length === 0) {
        movieRatings.textContent = "Non renseigné";
    } else {
        movie.ratings.forEach(rating => {
            const ratingLine = document.createElement("div");
            ratingLine.textContent = `${rating.Source} : ${rating.Value}`;
            movieRatings.append(ratingLine);
        });
    }

    /* ==============================================
    4. Désactivation du paramètre hidden
    =============================================== */

    document.querySelector(".movie_details").hidden = false;
    movieStatus.hidden = true;

    /* ==============================================
    5. Gestion des erreurs (englobe 2,3,4)
    =============================================== */
} catch (error) {
    console.error("Erreur lors du chargement du film :", error);

    const movieStatus = document.querySelector("#movie_status");

    if (error.message === "Film introuvable") {
        window.location.href = "../404.html";
    } else {
        movieStatus.textContent = "Échec du chargement du film";
    }
}
