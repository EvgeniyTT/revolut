import { API_URL, LATEST } from '../api-routes';

// https://api.exchangeratesapi.io/latest?base=EUR

export function fetchRates(base) {
  return fetch(`${API_URL}${LATEST}?base=${base}`)
    .then(res => res.json());
    // TODO: handle errors
}




