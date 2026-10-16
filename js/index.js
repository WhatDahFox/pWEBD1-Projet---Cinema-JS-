import { requestById } from "./api.js";
import { createCard } from "./cards.js";

const trendingMovies = [
    "tt22084616",
    "tt33764258",
    "tt29355505",
    "tt11378946",
    "tt28650488"
]
for (const id of trendingMovies) {
    try{
        const movie = await requestById(id);
        document.querySelector(".trending_movies").append(createCard(movie));
    } catch(err){
        console.error(`Film ${id} ; ${err.message}`);
    }

}