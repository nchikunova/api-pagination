const BASE_URL = 'https://api.themoviedb.org/3/';
const ENDPOINT = 'trending/movie/day';
const API_KEY = 'f2539677659f743858aef093e7c82be1';

export default function getTrending(page = 1) {
  return fetch(
    `${BASE_URL}${ENDPOINT}?api_key=${API_KEY}&page=${page}&language=uk-EN`
  ).then(response => {
    if (!response.ok) {
      throw new Error(response.statusText);
    }
    return response.json();
  });
}
