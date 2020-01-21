
export const RECEIVE_RATES = 'RECEIVE_RATES';
export const SELECT_POCKET_FROM = 'SELECT_POCKET_FROM';
export const SELECT_POCKET_TO = 'SELECT_POCKET_TO';
export const EXCHANGE = 'EXCHANGE';

export const exchange = ({ pocketFrom, pocketTo, totalFrom, totalTo }) => ({
  type: EXCHANGE,
  pocketFrom,
  totalFrom,
  pocketTo,
  totalTo
});

export const selectPocketFrom = pocket => ({
  type: SELECT_POCKET_FROM,
  pocket,
});

export const selectPocketTo = pocket => ({
  type: SELECT_POCKET_TO,
  pocket,
});

export const receiveRates = rates => ({
  type: RECEIVE_RATES,
  rates
});
