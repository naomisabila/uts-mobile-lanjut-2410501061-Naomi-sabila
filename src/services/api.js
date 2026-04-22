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