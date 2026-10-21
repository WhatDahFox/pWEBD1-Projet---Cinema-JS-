/* ==============================================
0. Importation des fonctions
=============================================== */

import { requestById } from "./api.js";
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
const idsRecent = [
    "tt33612209",
    "tt12042730",
    "tt38035835",
    "tt2293640",
    "tt37287335",
    "tt26657236",
    "tt26443616",
    "tt34386754",
    "tt36103784",
    "tt30825738",
    "tt43515101",
    "tt41791573",
    "tt15047880",
    "tt32897959",
    "tt32093575",
    "tt27419466",
    "tt27047903",
    "tt32649961",
    "tt36535318",
    "tt27613895",
    "tt32393988",
    "tt29356163",
    "tt7526136",
    "tt39139925",
    "tt32261958",
    "tt39294728",
    "tt33071426",
    "tt32565993",
    "tt17490712",
    "tt8814476",
    "tt27165187",
    "tt0427340",
    "tt32588798",
    "tt1756855",
    "tt39123115",
    "tt43739386",
    "tt8036976",
    "tt32612507",
    "tt33714084",
    "tt34885279",
    "tt36586020",
    "tt38188218",
    "tt32430579",
    "tt31170389",
    "tt14173636",
    "tt36583977",
    "tt32141377",
    "tt32357218",
    "tt31050594",
    "tt34385135",
    "tt33029380",
    "tt27419420",
    "tt27564844",
    "tt34206385",
    "tt22868010",
    "tt32104007",
    "tt36576750",
    "tt27369017",
    "tt14850054",
    "tt39372922",
    "tt33978029",
    "tt33311069",
    "tt31450459",
    "tt39276601",
    "tt21285562",
    "tt33028778",
    "tt41635245",
    "tt7734244",
    "tt33763941",
    "tt38882969",
    "tt32547691",
    "tt32338669",
    "tt39390582",
    "tt27681354",
    "tt27050858",
    "tt40915506",
    "tt39316472",
    "tt39796931",
    "tt38201958",
    "tt37281055",
    "tt35511966",
    "tt39018643",
    "tt32306991",
    "tt37853455",
    "tt35672862",
    "tt30851137",
    "tt39216314",
    "tt35003538",
    "tt36352591",
    "tt39833109",
    "tt36586751",
    "tt4357198",
    "tt35892608",
    "tt36307021",
    "tt28553375",
    "tt34459219",
    "tt38872297",
    "tt43295610",
    "tt31728330",
    "tt33095251",
]


const recentContainer = document.querySelector(".recent_movies");
const buttonLoadMore = document.querySelector(".button_load_more");

let searchIndex = 0;
let isLoading = false;

async function loadRecentMovies() {
    if (isLoading) return;

    isLoading = true;
    buttonLoadMore.disabled = true;

    try {
        for(let i=0 ; i<5 ; i++) {
            const movie = await requestById(idsRecent[searchIndex], "short");
            searchIndex++;
            recentContainer.append(createCard(movie));
        }

        buttonLoadMore.hidden = searchIndex >= idsRecent.length;
    } catch (error) {
        console.error("Erreur de chargement des films récents", error);
    } finally {
        isLoading = false;
        buttonLoadMore.disabled = false;
    }
}

await loadRecentMovies();           // Appel de la fonction

buttonLoadMore.addEventListener("click", loadRecentMovies);         // Chargement au clic
