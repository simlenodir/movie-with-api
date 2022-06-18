const APIkey = "04c35731a5ee918f014970082a0088b1";
let PAGE = "2";
let searchWord = "popularity.desc";

let elList = document.querySelector(".js_list");
let movieCard = document.getElementById("card-templete").content;
let cardWrapper = document.createDocumentFragment();
let loader = document.querySelector(".js-loader");
let elSearch = document.querySelector(".search-form");
let elSearchInput = document.querySelector(".search-input");
let elBtnWrapper = document.querySelector(".btn_wrapper");
let elPrevBtn = document.querySelector(".prev");
let elNextBtn = document.querySelector(".next");
let elCurrenBtn = document.querySelector(".current");

let page = 1;
let limit = 4;
let movies = [];

fetch(
  `https://api.themoviedb.org/3/discover/movie?sort_by=${searchWord}&api_key=${APIkey}&page=${PAGE}`
)
  .then((response) => response.json())
  .then((data) => {
    movies = data.results;
    renderMovies(data.results.slice(0, 4));
    loader.style.display = "none";
  });

function renderMovies(movies) {
  elList.innerHTML = "";
  movies.forEach((movie) => {
    let elLi = document.createElement("li");
    let card = movieCard.cloneNode(true);
    const IMGPATH = "https://image.tmdb.org/t/p/w1280";
    card.querySelector(".card-img-top").src = IMGPATH + movie.poster_path;
    card.querySelector(".card-title").textContent = movie.title;
    elLi.appendChild(card);
    cardWrapper.appendChild(elLi);
    elList.appendChild(cardWrapper);
  });
}

const MOVIE_SEARCHAPI = `https://api.themoviedb.org/3/search/movie?&api_key=${APIkey}&query=${searchWord}`;

let handleSearch = (evt) => {
  evt.preventDefault();
  let elSearchInput = document.querySelector(".search-input");
  let searchValue = elSearchInput.value.trim();
  let regex = new RegExp(searchValue, "gi");
  fitredMovies = movies.filter((movie) => movie.title.match(regex));
  console.log(fitredMovies);
  elList.innerHTML = "";
  renderMovies(fitredMovies);
};

elCurrenBtn.textContent = page;
elPrevBtn.disabled = true;

let handlePagenation = (evt) => {
  let maxPage = Math.ceil(movies.length / limit);
  if (evt.target.matches(".next")) {
    if (page <= maxPage) {
      page++;
      elCurrenBtn.textContent = page;
      renderMovies(movies.slice(limit * (page - 1), page * limit));
    }
  }
  if (page === maxPage) {
    elNextBtn.disabled = true;
  } else {
    elPrevBtn.disabled = false;
    elNextBtn.disabled = false;
    // other time btns disabled false
  }
  if (evt.target.matches(".prev")) {
    if (page > 1) {
      page--;
      console.log(limit * (page - 1), page * limit);
      elCurrenBtn.textContent = page;
      renderMovies(movies.slice(limit * (page - 1), page * limit));
    }

  }
};

elBtnWrapper.addEventListener("click", handlePagenation);
elSearch.addEventListener("submit", handleSearch);
