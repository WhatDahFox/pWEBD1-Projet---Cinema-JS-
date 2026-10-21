/* ==============================================
1. Fonction pour créer une card
=============================================== */

export function createCard(movie) {
    const card = document.createElement("article");
    card.classList.add("movie_card");

    const poster = document.createElement("img");

    // Gestion d'absence de poster de film
    poster.onerror = () => {
        poster.onerror = null;
        poster.src = "./images/affiche_indisponible.png";
    };

    poster.src = movie.poster !== "N/A"
        ? movie.poster
        : "./images/affiche_indisponible.png";
    poster.alt =`Affiche du film ${movie.title}`;

    // Contenu des cards
    const content = document.createElement("div");
    content.classList.add("movie_card_content");

    const title = document.createElement("h3");
    title.classList.add("movie_card_title");
    title.innerText = movie.title;

    const description = document.createElement("p");
    description.classList.add("movie_card_description");
    description.innerText = movie.plot;

    const link = document.createElement("a");
    link.classList.add("movie_card_anchor")
    link.href = `movie.html?id=${movie.id}`;

    const detailsLabel = document.createElement("span");
    detailsLabel.classList.add("movie_card_detailsLabel");
    detailsLabel.innerText = "Voir les détails";

    content.append(title, description, detailsLabel);
    card.append(poster, content);
    link.append(card);

    return link;
}
