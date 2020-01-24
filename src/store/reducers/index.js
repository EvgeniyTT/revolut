import {createStore, applyMiddleware} from 'redux';
import thunkMiddleware from 'redux-thunk';
import {initialPockets} from '../pockets-data';
import {
  EXCHANGE,
  RECEIVE_RATES,
  SELECT_POCKET_FROM,
  SELECT_POCKET_TO,
} from '../actions';
import {getExchangeRate} from '../../utils/helpers';

export const initialState= {
  exchangeRate: 1,
  pockets: initialPockets,
  // TODO: better to keep pocketFromId and pocketToId instead of objects
  pocketFrom: {},
  pocketTo: {},
};

export const reducer = (state = initialState, action, storeState) => {
  switch (action.type) {
    case SELECT_POCKET_FROM:
      return {
        ...state,
        pocketFrom: action.pocket,
      };

    case SELECT_POCKET_TO:
      return {
        ...state,
        pocketTo: action.pocket,
        exchangeRate: getExchangeRate(state.rates, action.pocket.currency),
      };

    case RECEIVE_RATES:
      return {
        ...state,
        rates: action.rates,
        // TODO: blow up if there is no exchange rate for this currency
        exchangeRate: getExchangeRate(action.rates, state.pocketTo.currency),
      };

    case EXCHANGE:
      const pocketFrom = {...action.pocketFrom, amount: action.totalFrom};
      const pocketTo = {...action.pocketTo, amount: action.totalTo};
      const pockets = state.pockets.map(pocket => pocket.id === pocketFrom.id ?
        pocketFrom :
        pocket.id === pocketTo.id ?
          pocketTo :
          pocket,
      );

      return {
        ...state,
        pocketFrom,
        pocketTo,
        pockets,
      };

    default:
      return state;
  }
};

export default reducer;
export const store = createStore(reducer, initialState, applyMiddleware(thunkMiddleware));
