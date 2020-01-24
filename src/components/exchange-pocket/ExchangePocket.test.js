import React from 'react';
import {render} from '@testing-library/react';
import {amountInputTestId, calculationTestId, labelTestId} from './';
import ExchangePocket from './';

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

const props = {
  pockets: testPockets,
  selectedPocket: {},
  isFromPocket: true,
  amount: '',
  total: 0,
  onValueChange: () => {},
  onPocketChange: () => {},
};

test('expect amount input accepts numbers', () => {
  const numberInput = '97531';
  const {getByTestId} = render(<ExchangePocket {...props} />);

  const amountInput = getByTestId(amountInputTestId);

  expect(amountInput).toBeInTheDocument();
  amountInput.value = numberInput;
  expect(amountInput.value).toBe(numberInput);
});

test('expect amount input accepts decimal numbers', () => {
  const numberInput = '333.756';
  const {getByTestId} = render(<ExchangePocket {...props} />);
  const amountInput = getByTestId(amountInputTestId);

  expect(amountInput).toBeInTheDocument();
  amountInput.value = numberInput;
  expect(amountInput.value).toBe(numberInput);
});

test('expect amount input DOES NOT accept characters', () => {
  const charInput = 'abs';
  const {getByTestId} = render(<ExchangePocket {...props} />);
  const amountInput = getByTestId(amountInputTestId);

  expect(amountInput).toBeInTheDocument();
  amountInput.value = charInput;
  expect(amountInput.value).toBe('');
});

test('expect to show default calculation until pocket and amount are set', () => {
  const {queryByTestId} = render(<ExchangePocket {...props} />);
  const calculationEl = queryByTestId(calculationTestId);
  expect(calculationEl).toBeInTheDocument();
  expect(calculationEl.textContent).toBe('0 - 0 = 0');
});

test('expect to show calculation when pocket and amount are set', () => {
  const newProps = {...props, amount: '112', total: 223, selectedPocket: {id: '2', amount: 335}};
  const {queryByTestId} = render(<ExchangePocket {...newProps} />);
  const calculationEl = queryByTestId(calculationTestId);
  expect(calculationEl).toBeInTheDocument();
  expect(calculationEl.textContent).toBe(`${newProps.selectedPocket.amount} - ${newProps.amount} = ${newProps.total}`);
});

test('expect label to be "FROM" for "from" pocket', () => {
  const newProps = {...props, isFromPocket: true};
  const {queryByTestId} = render(<ExchangePocket {...newProps} />);
  const labelEl = queryByTestId(labelTestId);
  expect(labelEl).toBeInTheDocument();
  expect(labelEl.textContent).toBe('FROM');
});

test('expect label to be "TO" for "to" pocket', () => {
  const newProps = {...props, isFromPocket: false};
  const {queryByTestId} = render(<ExchangePocket {...newProps} />);
  const labelEl = queryByTestId(labelTestId);
  expect(labelEl).toBeInTheDocument();
  expect(labelEl.textContent).toBe('TO');
});

test('expect action to be "-" for "from" pocket', () => {
  const newProps = {...props, isFromPocket: true};
  const {queryByTestId} = render(<ExchangePocket {...newProps} />);
  const calculationEl = queryByTestId(calculationTestId);
  expect(calculationEl).toBeInTheDocument();
  expect(calculationEl.textContent).toBe('0 - 0 = 0');
});

test('expect action to be "+" for "to" pocket', () => {
  const newProps = {...props, isFromPocket: false};
  const {queryByTestId} = render(<ExchangePocket {...newProps} />);
  const calculationEl = queryByTestId(calculationTestId);
  expect(calculationEl).toBeInTheDocument();
  expect(calculationEl.textContent).toBe('0 + 0 = 0');
});
