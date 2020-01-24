import React from 'react';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {render, fireEvent, getByLabelText, getAllByLabelText, findByText, findByDisplayValue} from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import {reducer} from '../store/reducers';

const KEY_DOWN = 40;

// you can provide initialState for the entire store that the ui is rendered with
export function renderWithRedux(
    ui,
    {initialState, store = createStore(reducer, initialState)} = {},
) {
  return {
    ...render(<Provider store={store}>{ui}</Provider>),
    // adding `store` to the returned utilities to allow us
    // to reference it in our tests (just try to avoid using
    // this to test implementation details).
    store,
  };
}


// Select an item from a React Select dropdown given a label and
// choice label you wish to pick.
export async function selectItem(container, selectLabel, option) {
  // Focus and enable the dropdown of options.
  const select = getAllByLabelText(container, selectLabel)[2];
  fireEvent.focus(select);
  fireEvent.keyDown(select, {
    keyCode: KEY_DOWN,
  });

  // Wait for the dropdown of options to be drawn.
  await findByText(container, option);

  // Select the item we care about.
  fireEvent.click(getByText(container, option));

  // Wait for your choice to be set as the input value.
  await findByDisplayValue(container, option);
}
