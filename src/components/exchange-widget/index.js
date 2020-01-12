import React from 'react';
import ExchangePocket from '../exchange-pocket';
import { fetchRates } from '../../services';
import { pockets } from '../../pockets-data';



const scaleNames = {
  c: 'Celsius',
  f: 'Fahrenheit'
};

function toCelsius(fahrenheit) {
  return (fahrenheit - 32) * 5 / 9;
}

function toFahrenheit(celsius) {
  return (celsius * 9 / 5) + 32;
}

function tryConvert(temperature, convert) {
  const input = parseFloat(temperature);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}

function BoilingVerdict(props) {
  if (props.celsius >= 100) {
    return <p>The water would boil.</p>;
  }
  return <p>The water would not boil.</p>;
}

class ExchangeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { temperature: '', scale: 'c', exchangeRate: 1, currencyFrom: '', currencyTo: ''};
  }

  handlePocketFromChange = (pocketId) => {
    const selectedPocket = pockets.find(pocket => pocket.id === pocketId);
    console.log('selectedPocket: ', selectedPocket);
    
    fetchRates(selectedPocket.currency).then(res => {
      this.rates = res.rates;
      this.setState({ 
        currencyFrom: selectedPocket.currency,
        exchangeRate: res.rates[this.state.currencyTo] || 1
      })
    })

  }

  handlePocketToChange = () => {
    
  }

  handleValueFromChange = (temperature) => {
    this.setState({scale: 'c', temperature});
  }

  handleValueToChange = (temperature) => {
    this.setState({scale: 'f', temperature});
  }

  render() {
    const scale = this.state.scale;
    const temperature = this.state.temperature;
    const celsius = scale === 'f' ? tryConvert(temperature, toCelsius) : temperature;
    const fahrenheit = scale === 'c' ? tryConvert(temperature, toFahrenheit) : temperature;

    return (
      <div>
        <ExchangePocket
          pockets={pockets}
          scale="c"
          temperature={celsius}
          onPocketChange={this.handlePocketFromChange}
          onValueChange={this.handleValueFromChange} />
        <ExchangePocket
          pockets={pockets}
          scale="f"
          temperature={fahrenheit}
          onPocketChange={this.handlePocketToChange}
          onValueChange={this.handleValueToChange} />
        <BoilingVerdict
          celsius={parseFloat(celsius)} />
      </div>
    );
  }
}


export default ExchangeWidget;