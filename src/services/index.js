import { API_URI, LATEST_URI } from '../api-routes';
import { receiveRates } from '../store/actions';

let intervalId;
const FETCH_RATES_TIME_INTERVAL = 1000; // can be changed to 10 000 to meet requirements

export const fetchRates = baseCurrency => dispatch => {
  if (intervalId) {
    clearInterval(intervalId);
  }
  intervalId = setInterval(() => {
    fetch(`${API_URI}${LATEST_URI}?base=${baseCurrency}`)
    .then(res => res.json())
    .then(res => dispatch(receiveRates(res.rates)))
    // TODO: handle errors, redirect to the error page \ show notification, log the error
    .catch(err => { console.error(err) });
  }, FETCH_RATES_TIME_INTERVAL)
}

