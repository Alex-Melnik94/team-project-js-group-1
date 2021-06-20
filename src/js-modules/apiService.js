
const API_KEY = 'bf52702752a5ae3d0e879b91a59cc623';


export default {
  searchQuery: '',
  
  page: 1,
  
  
  fetchMovies() {
    
    const url = `https://api.themoviedb.org/3/search/movie?api_key=${API_KEY}&language=en-US&page=${this.page}&query=${this.searchQuery}`;
    return fetch(url).then(res => res.json()).then(({ results }) => {
     
      this.releaseDateParse(results)
      this.genresParse(results)
      
      return results
      
    });
  },
  

  releaseDateParse(results) {
    return results.forEach(item => {
      if (!item.release_date) {
        return item.release_date = ''
      }
      item.release_date = item.release_date.slice(0, 4)
    })
  },
  
  genresParse(results) {
      const localGenres = localStorage.getItem('genres');
        const genres = JSON.parse(localGenres);
     return results.reduce((arr, el) => {
        
        
        const filmGenres = el.genre_ids.map((genreId) => {

            const genre = genres.find((el) => el.id === genreId);
            genreId = genre.name;
            return genreId;
        });

        el.genre_ids = filmGenres.join(', ');

    arr.push(el);
        return arr;
    }, []);

     
},
    incrementPage() {
    return (this.page += 1);
  },
  decrementPage() {
    if (this.page === 1) {
      return;
    }
    return (this.page -= 1);
  },
};



































