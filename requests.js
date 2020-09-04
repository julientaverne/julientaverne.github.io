const getMovieModal = (id, api) => {
  return api
    .get(`/${id}?api_key=${API_KEY}&language=en-US`)
    .then(result => {
      let info = result.data;
      console.log(info);
      const ModalHtml = templateMovie(
        info.title,
        info.budget,
        info.overview,
        info.revenue,
        info.genres
      );
      return ModalHtml;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};

const getMovie = api => {
  return api
    .get(`/popular?api_key=${API_KEY}&language=en-US`)
    .then(res => {
      let data = res.data;
      let movieList = "";

      data.results.forEach(movie => {
        const newCardHtml = getCardHtml(
          movie.poster_path,
          movie.title,
          movie.id,
          movie.release_date
        );
        console.log(newCardHtml);
        movieList = movieList + newCardHtml;
      });
      return movieList;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};

const getTvshow = api => {
  return api
    .get(`/popular?api_key=${API_KEY}&language=en-US&page=1`)
    .then(res => {
      let tvData = res.data;
      let tvList = "";
      tvData.results.forEach(Tv => {
        const newCard = getCardHtml(
          Tv.poster_path,
          Tv.name,
          Tv.id,
          Tv.first_air_date
        );
        tvList = tvList + newCard;
      });
      return tvList;
    })
    .catch(e => {
      console.error(e);
      return Promise.reject(e);
    });
};

const getTvModal = (id, api) => {
  return api
    .get(`/${id}?api_key=${API_KEY}&language=en-US`)
    .then(result => {
      let info = result.data;
      console.log(result.data);
      const ModalHtml = templateTv(
        info.name,
        info.number_of_seasons,
        info.number_of_episodes,
        info.overview,
        info.genres
      );
      return ModalHtml;
    })
    .catch(e => {
      return Promise.reject(e);
    });
};
