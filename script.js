let APIkey = 'e702d29de354fcbcbec9e4dcf9801296';

//api for the trending list
async function fetchMeUserInfo() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=${APIkey}`);
    const dataWithJSON = await response.json();
    const finalOutputArray = dataWithJSON.results;

    const genres = await fetchGenres();

    createUI(finalOutputArray, genres);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//api for the genre list
async function fetchGenres() {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${APIkey}`);
    const dataWithJSON = await response.json();
    const genres = {};

    dataWithJSON.genres.forEach(genre => {
      genres[genre.id] = genre.name;
    });

    return genres;
  } catch (error) {
    console.error('Error fetching genres:', error);
  }
}

//function to display the search movie
function searchedMovie(finalOutputArray, genres) {
  let container = document.querySelector('#maincontainer');
  container.innerHTML = '';

  for (let i = 0; i < finalOutputArray.length; i++) {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');

    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original${finalOutputArray[i].poster_path}`;
    img.classList.add('poster_path');
    cardElement.appendChild(img);

    let contentInfo = document.createElement('div');

    let title = document.createElement('p');

    let movieName = "";
    if(finalOutputArray[i].title === null){
      movieName = finalOutputArray[i].name;
    }else{
      movieName = finalOutputArray[i].title;
    }
    title.textContent = movieName;
    contentInfo.appendChild(title);

    let releaseDate = document.createElement('p');
    releaseDate.textContent = finalOutputArray[i].release_date;
    contentInfo.appendChild(releaseDate);

    let overview = document.createElement('p');
    overview.textContent = finalOutputArray[i].overview;
    contentInfo.appendChild(overview);

    let genreList = document.createElement('p');
    let genreNames = finalOutputArray[i].genre_ids.map(genreId => genres[genreId]);
    genreList.textContent = genreNames.join(', ');
    contentInfo.appendChild(genreList);

    cardElement.appendChild(contentInfo);

    container.insertBefore(cardElement, container.firstChild);

    console.log(finalOutputArray[i].id);
  }
}

//Creating UI from the API
function createUI(finalOutputArray, genres) {
  let container = document.querySelector('#maincontainer');

  for (let i = 0; i < finalOutputArray.length; i++) {
    let cardElement = document.createElement('div');
    cardElement.classList.add('card');

    let img = document.createElement('img');
    img.src = `https://image.tmdb.org/t/p/original${finalOutputArray[i].poster_path}`;
    img.classList.add('poster_path');
    cardElement.appendChild(img);

    let contentInfo = document.createElement('div');

    let title = document.createElement('p');

    let movieName = "";
    if(finalOutputArray[i].title === undefined){
      movieName = finalOutputArray[i].name;
    }else{
      movieName = finalOutputArray[i].title;
    }
    title.textContent = movieName;
    contentInfo.appendChild(title);

    let releaseDate = document.createElement('p');
    releaseDate.textContent = finalOutputArray[i].release_date;
    contentInfo.appendChild(releaseDate);

    let overview = document.createElement('p');
    overview.textContent = finalOutputArray[i].overview;
    contentInfo.appendChild(overview);

    let genreList = document.createElement('p');
    let genreNames = finalOutputArray[i].genre_ids.map(genreId => genres[genreId]);
    genreList.textContent = genreNames.join(', ');
    contentInfo.appendChild(genreList);

    cardElement.appendChild(contentInfo);
    container.appendChild(cardElement);
    console.log(finalOutputArray[i].id);
  }
}

fetchMeUserInfo();

//API for searching movies
async function search(movieTitle) {
  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=${APIkey}&query=${movieTitle}`);
    const dataWithJSON = await response.json();
    const finalOutputArray = dataWithJSON.results;

    const genres = await fetchGenres();

    searchedMovie(finalOutputArray, genres);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//Event listener for the button and search bar
const searchButton = document.getElementById('search');
searchButton.addEventListener('click', () => {
  const searchInput = document.getElementById('search-input');
  const query = searchInput.value;
  search(query);
});