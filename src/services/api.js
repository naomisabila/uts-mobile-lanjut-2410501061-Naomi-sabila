const BASE_URL = 'https://api.tvmaze.com';

export const fetchPopularShows = async () => {
  try {
    const response = await fetch(`${BASE_URL}/shows`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.slice(0, 50);
  } catch (error) {
    throw error;
  }
};

export const fetchShowDetail = async (showId) => {
  try {
    const response = await fetch(`${BASE_URL}/shows/${showId}`);
    if (!response.ok) {
      throw new Error('Gagal mengambil detail show');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchSearchShows = async (keyword) => {
  try {
    const response = await fetch(`${BASE_URL}/search/shows?q=${keyword}`);
    if (!response.ok) {
      throw new Error('Pencarian gagal');
    }
    const data = await response.json();
    return data.map(item => item.show);
  } catch (error) {
    throw error;
  }
};