import {defineConfig} from 'vite';

export default defineConfig({
    input: {
        index: "index.html",
        search: "search.html",
        movie: "movie.html",
        erreur404: "404.html",
    },

    appType: "mpa"
});
