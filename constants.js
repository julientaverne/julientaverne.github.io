const API_KEY = "e2b540041089cbb9f9c6ee6ff947fbce";
const cardHTMLMovie = "";

const loading = `<div id ="page-load">
<div class="progress">
<div class="indeterminate"></div>
</div>

</div>`;

const mainload = `<div id="mainloadpage">
<div class="preloader-wrapper big active loadicon">
<div class="spinner-layer spinner-blue ">
  <div class="circle-clipper left">
    <div class="circle"></div>
  </div><div class="gap-patch">
    <div class="circle"></div>
  </div><div class="circle-clipper right">
    <div class="circle"></div>
  </div>
</div>
</div>
</div>`;

const templateMovie = (name, budget, overview, revenue, genres) => {
  let genresHtml = "";
  genres.forEach(genre => {
    genresHtml += `<span>${genre.name}</span>`;
  });
  return `
  <div class="heading-modal">
  <h2 class ="modalname">${name}</h3></div>
  </div><h5>Budget:</h5><hr>
  <h6>${budget}</h6>
  <br>
  <h5>Overview</h5><hr>
  <h6>${overview}</h6>
  <br>
  <h5>Revenue</h5><hr>
  <h6>${revenue}</h6>
  <br>
  <h5>Genres</h5><hr>
  ${genresHtml}`;
};

const getCardHtml = (imgSrc, title, movieId, release) => {
  return `
  <div class="col s12 m6 l3">
    <div class="card">
      <div class="card-image">
        <img class="materialboxed" height="500" src="https://image.tmdb.org/t/p/w500${imgSrc}" />
        <span class="card-title">${title}</span>
        <a href="#modal1" class="btn-floating halfway-fab waves-effect waves-light red btn modal-trigger fabutton"><i id="${movieId}" class=" material-icons">featured_video</i></a>
      </div>
      <div class="card-content">
      <h6 id ="releasedate">Release Date: &nbsp <span>${release}</span></h6></div>
    </div>
  </div>`;
};
const templateTv = (name, seasons, episodes, overview, genres) => {
  let genresHtml = "";
  genres.forEach(genre => {
    genresHtml += `<span>${genre.name}</span>`;
  });

  return `
<div class="heading-modal">
  <h4 class ="modalname">${name}</h4></div>
<h4>Number of Seasons</h4><hr>
<h5>${seasons}</h5>
<br>
<h4>Number of Episodes</h4><hr>
<h5>${episodes}</h5>
<br>
<h4>Overview</h4><hr>
<p>${overview}</p>
<br>
<h5>Genres</h5><hr>
  ${genresHtml}`;
};
