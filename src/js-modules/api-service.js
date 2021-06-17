const API_KEY = 'bf52702752a5ae3d0e879b91a59cc623';

export const getGenres = async function () {
  const url = `https://api.themoviedb.org/3/genre/movie/list?api_key=${API_KEY}`;

  const response = await fetch(url);
  const data = await response.json();
    const genres = data.genres;
    localStorage.setItem('genres', JSON.stringify(genres));
};


export const getTrendingFilms = async function () {

  const url = `https://api.themoviedb.org/3/trending/movie/day?api_key=${API_KEY}&page=1`;

  const response = await fetch(url);
    const data = await response.json();
    
    const localGenres = localStorage.getItem('genres');
    const genres = JSON.parse(localGenres);
    
    const updatedFilmData = data.results.reduce((arr, el) => {
        el.release_date = el.release_date.slice(0, 4);
        
        const filmGenres = el.genre_ids.map((genreId) => {

            const genre = genres.find((el) => el.id === genreId);
            genreId = genre.name;
            return genreId;
        });

        el.genre_ids = filmGenres.join(', ');

    arr.push(el);
        return arr;
    }, []);

    return updatedFilmData;
};
