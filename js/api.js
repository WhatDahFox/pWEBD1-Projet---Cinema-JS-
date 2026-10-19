/* ==============================================
0. Importation de la clé API
=============================================== */
const API_KEY = import.meta.env.VITE_OMDB_KEY;

/* ==============================================
1. Requête par ID
=============================================== */

export function byDefault(value){
    return value !=="N/A" ? value : "Non Renseigné";
}

export async function requestById(imdbID, plot)     /*plot=short or full*/ {
    const data = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=${plot}`).then(r=>r.json());

    if (data.Response === "False"){
        if (data.Error === "Incorrect IMDb ID.") {
            throw new Error("Film introuvable");
        }
        throw new Error(data.Error);
    }

    return{
        id: data.imdbID,
        title: byDefault(data.Title),
        year: byDefault(data.Year),
        poster: data.Poster,
        plot: byDefault(data.Plot),
        genre: byDefault(data.Genre),
        actors: byDefault(data.Actors),
        ratings: data.Ratings,          /*Il s'agit d'un tableau qui sera vide s'il n'y a pas les notes*/
        dvd: byDefault(data.DVD)
    };
}

/* ==============================================
2. Requête par titre ou année - 10 films maximum
=============================================== */

export async function requestByTitle(searchTerm, page, year = ""){
    const data = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}&y=${year}&type=movie`).then(r=>r.json());

    if (data.Response === "False"){
        return [];
    }

    return data.Search.map(movie => movie.imdbID);
}
