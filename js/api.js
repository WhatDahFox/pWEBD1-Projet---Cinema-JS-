const API_KEY = "c0dacd33";

/*Les 2 Fonctions de requête pour les cards*/
export function byDefault(value){
    return value !=="N/A" ? value : "Non Renseigné";
}

export async function requestById(imdbID) {
    const data = await fetch(`https://www.omdbapi.com/?apikey=${API_KEY}&i=${imdbID}&plot=short`).then(r=>r.json());

    if (data.Response === "False"){
        throw new Error(data.Error);
    }

    return{
        id: data.imdbID,
        title: byDefault(data.Title),
        poster: data.Poster, /*Il faudrait prévoir une image de base*/
        shortPlot: byDefault(data.Plot),
        genre: byDefault(data.Genre),
        actors: byDefault(data.Actors),
        ratings: data.Ratings, /*Il s'agit d'un tableau qui sera vide s'il n'y a pas les notes*/
        dvd: byDefault(data.DVD)
    };
}
