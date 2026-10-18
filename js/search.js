/* ==============================================
0. Importation des fonctions
=============================================== */

import {requestById, requestByTitle} from "./api.js";
import {createCard} from "./cards.js";

/* ==============================================
1. Fonctionnement de la barre de recherche
=============================================== */

const searchMessage = document.querySelector("#search_message");
const searchInput = document.querySelector("#search_input");
const searchResults = document.querySelector(".search_results");
const buttonLoadMore = document.querySelector(".button_load_more");

let searchTerm = "";
let timer;                          /*ce sera le timer pour vérifier le temps de frappe*/
let currentSearch = 0;      /*On va s'en servir pour repérer les requêtes obsolètes*/
let page = 1;               /*Correspond à la page de la requête API*/

searchInput.addEventListener('input', () => {        /*À chaque input, le timer de 500ms se réinitialise*/
    clearTimeout(timer);
    const searchNumber = ++currentSearch;           /*On met à jour le nombre de recherches et le numéro de la recherche actuelle*/

    timer = setTimeout(async () => {
        searchTerm = searchInput.value.trim();                  /*cela enlève les espaces en début et fin*/

        if (searchTerm.length < 3) {                            /*On évite les résultats dans lesquels OMDB indique trop de résultat.*/
            searchResults.innerHTML = "";
            buttonLoadMore.hidden = true;
            searchMessage.textContent = "Saisissez le titre d'un film pour commencer";
            return;
        }

        try {
            page = 1;
            const ids = await requestByTitle(searchTerm, page);     /*On récupère les ids des films*/
            const results = await Promise.allSettled(ids.map(id => requestById(id, "short"))
            );      /*On récupère les données de tous les films*/

            if (searchNumber !== currentSearch) {       /*Pour éviter que des films d'une précédente recherche polluent les résultats*/
                return;
            }

            searchResults.innerHTML = "";       /*On nettoie la page des anciens résultats*/
            buttonLoadMore.hidden = true;

            if (ids.length === 0) {
                searchMessage.textContent = "Aucun film trouvé";        /*Message en cas d'absence de film correspondant*/
                buttonLoadMore.hidden = true;
                return;
            }

            for (const result of results) {
                if (result.status === "fulfilled") {
                    searchResults.append(createCard(result.value));     /*On fait apparaitre les cards*/
                    buttonLoadMore.hidden = false;
                } else {
                    console.error(result.reason.message);
                }
            }

            searchMessage.textContent = "";

        } catch (err) {
            console.error(err.message)
        }

    }, 500);
});

/* ==============================================
2. Bouton Load More
=============================================== */

buttonLoadMore.addEventListener("click", async () => {
    const searchNumber = currentSearch;         /*Numéro de la recherche au moment du clic*/
    buttonLoadMore.disabled = true;         /*On désactive le bouton le temps de la requête*/
    page++;
    try{
        const ids = await requestByTitle(searchTerm, page);     /*On récupère les ids des films*/
        if (ids.length === 0) {                                         /*Désactive le bouton en absence de film à charger*/
            buttonLoadMore.hidden = true;
            return;
        }

        const results = await Promise.allSettled(ids.map(id => requestById(id, "short"))
        );      /*On récupère les données de tous les films*/

        if (searchNumber !== currentSearch) {       /*Pour éviter que des films d'une précédente recherche polluent les résultats*/
            return;
        }

        for (const result of results) {
            if (result.status === "fulfilled") {
                searchResults.append(createCard(result.value));     /*On fait apparaitre les cards*/
            } else {
                console.error(result.reason.message);
            }
        }

    } catch (err) {
        console.error(err.message)
    } finally {
        buttonLoadMore.disabled = false;
    }

})
