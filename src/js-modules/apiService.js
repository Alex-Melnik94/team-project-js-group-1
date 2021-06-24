
const API_KEY = 'bf52702752a5ae3d0e879b91a59cc623';


export default {
  searchQuery: '',




  async fetchMovies(page = 1) {

    try {
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${page}&query=${this.searchQuery}`;
      return fetch(url).then(res => res.json()).then(data => {
        const localGenres = localStorage.getItem('genres');
        const genres = JSON.parse(localGenres);

        const totalPages = data.total_pages;
        const updatedFilmData = data.results.reduce((arr, el) => {

          if (!el.release_date || el.release_date.length === 0 || el.release_date === undefined) {
            el.release_date = 'Unknown release date';
          }
          else {
            el.release_date = el.release_date.slice(0, 4);
          }

          if (el.overview.length === 0) {
            el.overview = 'Overview is not provided.';
          }
 
          el.vote = el.vote_average;
          el.votes = el.vote_count;
          el.popularity = parseFloat(el.popularity).toFixed(2);

          if (el.genre_ids.length === 0 || el.genre_ids === undefined) {
            el.genre_ids = "Unspecified genre";
          }

          else {
            const filmGenres = el.genre_ids.map((genreId) => {

              const genre = genres.find((el) => el.id === genreId);
              genreId = genre.name;
              return genreId;
            });

            el.genre_ids = filmGenres.join(', ');
          }

          if (el.poster_path === null) {
            el.poster_path = "http://lexingtonvenue.com/media/poster-placeholder.jpg";
          }

          else {
            el.poster_path = `https://image.tmdb.org/t/p/original${el.poster_path}`;
          }



          arr.push(el);
          return arr;
        }, []);
        sessionStorage.setItem('arrayWithMovies', JSON.stringify(updatedFilmData));


        return { updatedFilmData, totalPages };

      })
    }
    catch (error) {

      return { error };
    }
  }




};
















