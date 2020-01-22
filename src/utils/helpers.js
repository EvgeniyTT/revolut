const INPUT_DEFAULT = '0.00';

export function tryConvert(amount, convert) {
  const input = parseFloat(amount);
  const output = convert(input);
  const rounded = parseToTwoDecimal(output);
  return Number.isNaN(rounded) ? INPUT_DEFAULT : rounded.toString();
}

export function parseToTwoDecimal(string) {
  // have to parseFloat second time as far .toFixed returns a string
  const number = parseFloat(parseFloat(string).toFixed(2));
  return Number.isNaN(number) ? 0.00 : number;
}

export function getRandomNumber(min, max) {
  return Math.random() * (max - min) + min;
}

// TODO: handle a case if there is no exchange rate for selected currency, redirect to error page or show some notification.
// for now just set rate to 1
// multiply by some random number to emulate rate changes
export const getExchangeRate = (rates, currency) =>
  ((rates && rates[currency]) * getRandomNumber(0.9, 1.1)) || 1;
