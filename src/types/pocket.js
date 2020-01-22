// types/index.js
import {shape, number, string} from 'prop-types';

export const pocketType = shape({
  id: number.isRequired,
  name: string.isRequired,
  currency: string.isRequired,
  amount: number.isRequired,
});
