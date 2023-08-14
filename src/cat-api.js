const BASE_URL = 'https://api.thecatapi.com/v1/';
const END_POINT = `breeds`;
const API_KEY =
  'live_KNaP6U3N7xuOCwnhL5g2pL3Ok0UwgIm2w2Li2QtBisnbYx5Qyafue7WEvZBgVSdt';
const headers = {
  'x-api-key': API_KEY,
};
export function fetchBreeds() {
  return fetch(`${BASE_URL}${END_POINT}`, { headers })
    .then(response => {
      console.log(response);
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

export function fetchCatByBreed(breedId) {
  const SEARCH_URL = `${BASE_URL}images/search?breed_ids=${breedId}&api_key=${API_KEY}`;

  return fetch(SEARCH_URL, { headers })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.statusText);
      }
      return response.json();
    })
    .catch(error => {
      throw new Error(error.message);
    });
}

// import axios from 'axios';

// const API_KEY =
//   'live_VhtyYnkyxMgfx5Bi5E4pd702JpEuRLc28Ufpscydr16jp6skkL1koymAXPZMTipi';
// const headers = {
//   'x-api-key': API_KEY,
// };

// export function fetchBreeds() {
//   const BASE_URL = 'https://api.thecatapi.com/v1/breeds';

//   return axios
//     .get(BASE_URL, { headers })
//     .then(response => {
//       if (response.status !== 200) {
//         throw new Error(response.statusText);
//       }
//       return response.data;
//     })
//     .catch(error => {
//       throw new Error(error.message);
//     });
// }

// export function fetchCatByBreed(breedId) {
//   const SEARCH_URL = `https://api.thecatapi.com/v1/images/search?breed_ids=${breedId}`;

//   return axios
//     .get(SEARCH_URL, { headers })
//     .then(response => {
//       if (response.status !== 200) {
//         throw new Error(response.statusText);
//       }
//       return response.data;
//     })
//     .catch(error => {
//       throw new Error(error.message);
//     });
// }
