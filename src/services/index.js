import { API_URL, LATEST } from '../api-routes';

import { receiveQuotes, receiveRates } from '../store/actions';
// import fetchJsonp from 'fetch-jsonp';

// https://api.exchangeratesapi.io/latest?base=EUR

export const fetchRates = baseCurrency => dispatch => 
  fetch(`${API_URL}${LATEST}?base=${baseCurrency}`)
    .then(res => res.json())
    .then(res => dispatch(receiveRates(res.rates)));
    // TODO: handle errors

export const fetchQuotes = () => dispatch => 
  fetch(
    'http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=10',
    { jsonpCallback: '_jsonp' }
  )
    .then(res => res.json())
    .then(quotes => dispatch(receiveQuotes(quotes)))
