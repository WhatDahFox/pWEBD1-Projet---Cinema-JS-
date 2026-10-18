const API_KEY = import.meta.env.VITE_OMDB_KEY;

/*Les 2 Fonctions de requête pour les cards*/
export function byDefault(value){
    return value !=="N/A" ? value : "Non Renseigné";
}

export async function requestById(imdbID, plot)/*plot=short or full*/ {
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
        poster: data.Poster, /*Il faudrait prévoir une image de base*/
        plot: byDefault(data.Plot),
        genre: byDefault(data.Genre),
        actors: byDefault(data.Actors),
        ratings: data.Ratings, /*Il s'agit d'un tableau qui sera vide s'il n'y a pas les notes*/
        dvd: byDefault(data.DVD)
    };
}

/*Recherche par titre*/
/*La fonction renvoie un tableau de 10 ID de film*/
export async function requestByTitle(searchTerm, page){
    const data = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&s=${encodeURIComponent(searchTerm)}&page=${page}`).then(r=>r.json());

    if (data.Response === "False"){
        return [];
    }

    return data.Search.map(movie => movie.imdbID);
}
