const API_KEY = 'b124561251ac76174c08c4e65dffbd19';
const LANG = 'en-US';

let pageDefault = 1;
let apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${pageDefault}`;
let btnPrevious = document.getElementById('btnPrevious');
let btnNext = document.getElementById('btnNext');

btnNext.addEventListener('click', () => {

    if (pageDefault < 1000) {
        pageDefault += 1;
        apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${pageDefault}`;
        console.log(pageDefault);
        console.log(apiURL);
        loadMovies();
    }

});

btnPrevious.addEventListener('click', () => {

    if (pageDefault > 1) {
        pageDefault -= 1;
        apiURL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=${LANG}&page=${pageDefault}`;
        console.log(pageDefault);
        console.log(apiURL);
        loadMovies();
    }

});

const loadMovies = async() => {
    try {

        const response = await fetch(apiURL);
        const HTMLcontent = document.getElementById('container');

        if (response.status === 200 && response.ok === true) {

            const data = await response.json();
            let movies = '';
            let pathMoviePoster;
            console.log(data.results);

            data.results.forEach(movie => {
                pathMoviePoster = `https://image.tmdb.org/t/p/w500/${movie.poster_path}`;
                movies += `
                <div class="movie">
                    <img class="poster" src="${pathMoviePoster}" alt="${movie.title}" title="${movie.title}">
                    <h1 class="title">${movie.title}</h1>
                </div>
                `;
            });

            HTMLcontent.innerHTML = movies;

        } else if (response.status === 401) {
            console.log('ERROR: Los datos de Autenticación han fallado. Por favor asegurarse que los datos utilizados son los correctos.');
        } else if (response.status === 404) {
            console.log('ERROR: La película que buscabas no fue encontrada.');
        } else {
            console.log('ERROR: Hubo un error inesperado. Por favor contacte con el administrador.');
        }


    } catch (error) {
        console.log(error);
    }
}

loadMovies();