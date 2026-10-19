/* ==============================================
0. Importation des fonctions
=============================================== */

import { requestById, requestByTitle } from "./api.js";
import { createCard } from "./cards.js";

/* ==============================================
1. Affichage des films 5 tendances
=============================================== */

const trendingMovies = [
    "tt22084616",
    "tt33764258",
    "tt29355505",
    "tt11378946",
    "tt28650488"
]
for (const id of trendingMovies) {
    try{
        const movie = await requestById(id, "short");
        document.querySelector(".trending_movies").append(createCard(movie));
    } catch(err){
        console.error(`Film ${id} ; ${err.message}`);
    }

}

/* ==============================================
2. Affichage des films récents (2026)
=============================================== */

const recentSearches = [
    "Scream",
    "Avatar",
    "Avengers",
    "Spider-Man",
    "The odyssey"
];

const recentContainer = document.querySelector(".recent_movies");
const buttonLoadMore = document.querySelector(".button_load_more");

let searchIndex = 0;
let currentPage = 1;
let isLoading = false;

async function loadRecentMovies() {
    if (isLoading) return;

    isLoading = true;
    buttonLoadMore.disabled = true;

    try {
        while (searchIndex < recentSearches.length) {
            const title = recentSearches[searchIndex];
            const ids = await requestByTitle(title, currentPage, 2026);

            if (ids.length === 0) {
                searchIndex++;
                currentPage = 1;
                continue;
            }

            for (const id of ids) {
                const movie = await requestById(id, "short");
                recentContainer.append(createCard(movie));
            }

            currentPage++;
            break;
        }

        buttonLoadMore.hidden = searchIndex >= recentSearches.length;
    } catch (error) {
        console.error("Erreur de chargement des films récents", error);
    } finally {
        isLoading = false;
        buttonLoadMore.disabled = false;
    }
}

await loadRecentMovies();           // Appel de la fonction

buttonLoadMore.addEventListener("click", loadRecentMovies);         // Chargement au clic

/* ==============================================
3. Bouton charger plus - 10 par 10
=============================================== */



