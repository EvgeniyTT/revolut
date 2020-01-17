import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';

import {
  RECEIVE_RATES,
  SELECT_POCKET_FROM,
  SELECT_POCKET_TO,
  RECEIVE_QUOTES,
  ADD_TO_FAVORITES,
  REMOVE_FROM_FAVORITES,
  UPDATE_FAVORITE_QUOTE
} from '../actions';

  // TODO: blow up if there is no exchange rate for this currency 
const _getExchangeRate = (rates, currency) => (rates && rates[currency]) || 1;

const initialState= {
  exchangeRate: 1,
  pocketFrom: {},
  pocketTo: {},
  quotes: [],
  favorites: [],
  author: {
    name: 'Evgeniy Tataryn',
    description: [
      ['Technical expertise', '5-years university degree, 7+ years of professional experience (5 QA + 2 development) in software development with focus on web-applications and web-services'],
      ["Communication", `Great communication skills.
        Effective collaboration with different team departments. Ability to establish close and long-term business-relationship between front-end, mobile, backend and QA teams.
        Upper-intermediate level of English (both written and verbal).
        Scrum master experience.`],
      ["Leadership", `5-years on team lead position. 
        Takes ownership of the most critical project solutions.
        Carried out mentoring and code review of less experienced team members.
        Taking care of projects estimation on behalf of JS department.`]
    ],
    introduction: 'I am a web developer that comes from QA. I like to make difference, to be proud of a product I\'m workin on and produce a result. I like to think critically and put into doubt settled decisions.',
    github: 'https://github.com/EvgeniyTT',
    google: 'https://plus.google.com/u/0/115803264476302732170',
    linkedIn: 'https://www.linkedin.com/in/evgeniy-tataryn-75310215a/'
  }
};

export const reducer = (state = initialState, action, storeState) => {

  console.log('action: ', action);
  switch (action.type) {

    case SELECT_POCKET_FROM:
      return {
        ...state,
        pocketFrom: action.pocket
      };

    case SELECT_POCKET_TO:
      return {
        ...state,
        pocketTo: action.pocket,
        exchangeRate: _getExchangeRate(state.rates, action.pocket.currency),
      };

    case RECEIVE_RATES:
      return {
        ...state,
        rates: action.rates,
        // TODO: blow up if there is no exchange rate for this currency 
        exchangeRate: _getExchangeRate(action.rates, state.pocketTo.currency),
      };

    case RECEIVE_QUOTES:
      return {
        ...state,
        quotes: action.quotes
      };

    case ADD_TO_FAVORITES:
      if(state.favorites.find(quote => quote.ID === action.quote.ID)) return state;
      return {
        ...state,
        favorites: [...state.favorites, action.quote]
      };
      
    case REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favorites: state.favorites.filter(quote => action.quote.ID !== quote.ID)
      };
      
    case UPDATE_FAVORITE_QUOTE:
      return {
        ...state,
        favorites: state.favorites.map(quote => {
          if (action.quote.ID === quote.ID) return action.quote;
          return quote;
        })
      };

    default:
      return state;
  }
};

export default reducer;
export const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));