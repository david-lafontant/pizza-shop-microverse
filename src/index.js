import './styles.css';
import './popupStyle.css';
import displayReservations from './modules/display_reservations.js';

const searchResult = document.querySelector('.search-result');

const appId = '2d879374';
const appKey = 'f1a2011b05e44970c7a43ac9a5a11568';

const getLikes = async () => {
  const likesUrl = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/apps/IvP42xNcmZ7sT5rp87wL/likes';
  const response = await fetch(likesUrl);
  return response.json();
};

const generateHtml = (results) => {
  results.slice(3, 12).forEach((result) => {
    const divItem = document.createElement('div');
    divItem.classList.add('item');
    divItem.innerHTML = `
        <img src="${result.food.image}" alt="${result.food.label}"   ">
        <div class="flex-container">
            <h1 class="title">${result.food.label}</h1>
            <div class="like-div">
              <p class="heart">&#10084;</p>
              <p class="likes"></p>
            </div>
            
        </div>
        <p class="item-data">
            <a class="comment" href="">Comment</a>
            <a class="reserve" id=${result.food.foodId} href="">Reservation</a>
        </p>
        `;
    searchResult.appendChild(divItem);
  });

  getLikes().then((response) => {
    const cards = document.querySelectorAll('.likes');
    cards.forEach((card, index) => {
      card.textContent = `
        ${response[index].likes} likes
        `;
    });
  });
};

const desplayResult = async () => {
  const baseURL = `https://api.edamam.com/api/food-database/v2/parser?ingr=pizza&app_id=${appId}&app_key=${appKey}&to=13`;
  const response = await fetch(baseURL);
  const data = await response.json();
  generateHtml(data.hints);
};

desplayResult();

document.querySelector('.search-result').addEventListener('click', (event) => {
  event.preventDefault();
  displayReservations(event);
});

// document.querySelector('.search-result').addEventListener('click', (event) => {

//   event.preventDefault();
//   if(event.target.classList.contains('submitBtn')){

//     console.log(event.target);

// }

// });