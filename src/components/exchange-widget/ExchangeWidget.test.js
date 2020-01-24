import React from 'react';
import {renderWithRedux} from '../../utils/test-utils';
import {exchangeButtonTestId} from './';
import ExchangeWidget from './';

const testPockets = [
  {
    id: '1',
    name: 'pocket1',
    currency: 'USD',
    amount: 134.87,
  },
  {
    id: '2',
    name: 'pocket2',
    currency: 'EUR',
    amount: 14.11,
  },
];

const testInitialState = {
  exchangeRate: 2,
  pockets: testPockets,
  pocketFrom: {},
  pocketTo: {},
};

test('expect exchange button to be disabled by defaul', async () => {
  // const amountFrom = '10';
  const {queryByTestId} = renderWithRedux(<ExchangeWidget />, {
    initialState: testInitialState,
  });
  const exchangeButton = queryByTestId(exchangeButtonTestId);

  expect(exchangeButton).toHaveAttribute('disabled');
});
