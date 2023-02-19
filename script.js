// // let APIkey = e702d29de354fcbcbec9e4dcf9801296;



async function fetchMeUserInfo() {
    try {
      const response = await fetch(`https://api.themoviedb.org/3/trending/all/day?api_key=e702d29de354fcbcbec9e4dcf9801296`);
      const dataWithJSON = await response.json();
      const finalOutputArray = dataWithJSON.results;
  
      createUI(finalOutputArray);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }


function createUI(finalOutputArray) {


    let container = document.querySelector('#maincontainer');

//     const genres = [
//         // 20230218191420
// // https://api.themoviedb.org/3/genre/movie/list?api_key=e702d29de354fcbcbec9e4dcf9801296

// {
//     "genres": [
//       {
//         "id": 28,
//         "name": "Action"
//       },
//       {
//         "id": 12,
//         "name": "Adventure"
//       },
//       {
//         "id": 16,
//         "name": "Animation"
//       },
//       {
//         "id": 35,
//         "name": "Comedy"
//       },
//       {
//         "id": 80,
//         "name": "Crime"
//       },
//       {
//         "id": 99,
//         "name": "Documentary"
//       },
//       {
//         "id": 18,
//         "name": "Drama"
//       },
//       {
//         "id": 10751,
//         "name": "Family"
//       },
//       {
//         "id": 14,
//         "name": "Fantasy"
//       },
//       {
//         "id": 36,
//         "name": "History"
//       },
//       {
//         "id": 27,
//         "name": "Horror"
//       },
//       {
//         "id": 10402,
//         "name": "Music"
//       },
//       {
//         "id": 9648,
//         "name": "Mystery"
//       },
//       {
//         "id": 10749,
//         "name": "Romance"
//       },
//       {
//         "id": 878,
//         "name": "Science Fiction"
//       },
//       {
//         "id": 10770,
//         "name": "TV Movie"
//       },
//       {
//         "id": 53,
//         "name": "Thriller"
//       },
//       {
//         "id": 10752,
//         "name": "War"
//       },
//       {
//         "id": 37,
//         "name": "Western"
//       }
//     ]
//   }
//     ]

    for (let i = 0 ; i < finalOutputArray.length; i++) {

       // Main Parent Tag which will have a class called as Card
        let cardElement = document.createElement("div");
        cardElement.classList.add("card");

        // image tag which will hold the user image
        let img = document.createElement("img");
        img.src = `https://image.tmdb.org/t/p/original${finalOutputArray[i].poster_path}`;
        img.classList.add("poster_path");


        cardElement.appendChild(img);



        // Create a div element for Name and email (PARENT)
        let contentInfo = document.createElement('div');

        // Full name of the user
        let fullName = document.createElement('p');
        fullName.textContent = `${finalOutputArray[i].title}`;

        contentInfo.appendChild(fullName);


        // email of the user
        let email = document.createElement('p');
        email.textContent = finalOutputArray[i].release_date;

        contentInfo.appendChild(email);

        let overview = document.createElement('p');
        overview.textContent = finalOutputArray[i].overview;

        contentInfo.appendChild(overview);


        let genre_ids = document.createElement('p');
        genre_ids.textContent = finalOutputArray[i].genre_ids;

        contentInfo.appendChild(genre_ids);
        

        

        cardElement.appendChild(contentInfo);

        // final container containing all the card elements we created above
        container.appendChild(cardElement);
        console.log(finalOutputArray[i].id);
    }

}


fetchMeUserInfo();