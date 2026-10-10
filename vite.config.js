import {defineConfig} from 'vite';

export default defineConfig({
    input: {
        index: "index.html",
        search: "search.html",
        movie: "movie.html",
    },

    appType: "mpa"
});
