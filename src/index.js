// import axios from 'axios';

// axios.defaults.headers.common['x-api-key'] =
//   'live_KNaP6U3N7xuOCwnhL5g2pL3Ok0UwgIm2w2Li2QtBisnbYx5Qyafue7WEvZBgVSdt';

import { fetchBreeds } from './cat-api';
import { fetchCatByBreed } from './cat-api';
import SlimSelect from 'slim-select';
import 'slim-select/dist/slimselect.css';
import './styles.css';

const refs = {
  selectField: document.querySelector('.breed-select'),
  loader: document.querySelector('.loader'),
  cardInfo: document.querySelector('.cat-info'),
  error: document.querySelector('.error'),
};

showLoader();
hideError();
hideSelect();

fetchBreeds()
  .then(breeds => {
    toSelectWithBreeds(breeds);
  })
  .catch(error => {
    hideLoader();
    showError();
    console.error(error);
  });

function toSelectWithBreeds(breeds) {
  const optionsMarkup = breeds
    .map(({ id, name }) => `<option value="${id}">${name}</option>`)
    .join('');
  refs.selectField.insertAdjacentHTML('afterbegin', optionsMarkup);

  showSelect();
  hideLoader();

  new SlimSelect({
    select: refs.selectField,
  });
}

refs.selectField.addEventListener('change', showSelectedCard);

function showSelectedCard(event) {
  event.preventDefault();

  const selectedCard = event.target.value;
  console.log(event.target.value);
  showLoader();
  fetchCatByBreed(selectedCard)
    .then(catData => {
      console.log(catData);
      hideLoader();
      hideError();

      refs.cardInfo.innerHTML = `<img src="${catData[0].url}" alt="" />
      <div class="characteristics-cat">
        <h2>${catData[0].breeds[0].name}</h2>
        <p>${catData[0].breeds[0].description}</p>
        <p><span class="temp">Temperament: </span>${catData[0].breeds[0].temperament}</p>
      </div>`;
    })
    .catch(error => {
      hideLoader();
      showError();

      console.error('Error fetching cat data:', error);
    });
}

function showLoader() {
  return refs.loader.classList.remove('hidden');
}

function hideLoader() {
  return refs.loader.classList.add('hidden');
}

function showError() {
  return refs.error.classList.remove('hidden');
}

function hideError() {
  return refs.error.classList.add('hidden');
}

function hideSelect() {
  return refs.selectField.classList.add('hidden');
}

function showSelect() {
  return refs.selectField.classList.remove('hidden');
}
