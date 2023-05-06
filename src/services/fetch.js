import axios from 'axios';

const API_KEY = '33828214-48c91a6a5d61090f6e4b0f82c';
axios.defaults.baseURL = `https://pixabay.com/api/`;

export const fetchPictures = async (query, page) => {
  const response = await axios.get(`?q=${query}`, {
    params: {
      key: API_KEY,
      page,
      image_type: 'photo',
      orientation: 'horizontal',
      per_page: 12,
    },
  });

  return response.data;
};