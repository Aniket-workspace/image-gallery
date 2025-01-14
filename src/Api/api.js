import axios from "axios";

const BASE_URL = 'https://api.unsplash.com/photos';
const SEARCH_URL = 'https://api.unsplash.com/search/photos';
const ACCESS_KEY = 'cHWWAjdrZzDm3IEgoUKE3i57QJAAoXGVJ8LhO1HcPWI';

// Fetch images 
export const fetchImages = async (page = 1, query = '') => {
  const url = query ? SEARCH_URL : BASE_URL;
  const params = { 
    page, 
    client_id: ACCESS_KEY, 
    ...(query && { query }) 
  };

  try {
    const { data } = await axios.get(url, { params });
    return query ? data.results || [] : data || [];
  } catch (error) {
    console.error('Error fetching data from Unsplash:', error);
    return [];  
  }
};
