import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExchangePocket from '../exchange-pocket';
import { fetchRates } from '../../services';
import {
  selectPocketFrom,
  selectPocketTo,
} from '../../store/actions';
import { pockets } from '../../store/pockets-data';
import './styles.css';

function tryConvert(amount, convert) {
  const input = parseFloat(amount);
  if (Number.isNaN(input)) {
    return '';
  }
  const output = convert(input);
  const rounded = Math.round(output * 1000) / 1000;
  return rounded.toString();
}


class _ExchangeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: '', scale: 'c', exchangeRate: 1 };
  }

  // componentDidMount() {
  //   this.props.fetchQuotes();
  // }

  handlePocketFromChange = selectedPocket => {
    this.props.fetchRates(selectedPocket.currency);
    this.props.selectPocketFrom(selectedPocket);
  }

  handlePocketToChange = selectedPocket => {
    this.props.selectPocketTo(selectedPocket);
  }

  handleValueFromChange = (amount) => {
    this.setState({ isFromPersistent: true, amount });
  }

  handleValueToChange = (amount) => {
    this.setState({ isFromPersistent: false, amount });
  }

  render() {

    console.log('rates: ', this.props.rates);
    console.log('exchangeRate: ', this.props.exchangeRate);
    const { exchangeRate, pocketFrom, pocketTo } = this.props;
    const { isFromPersistent, amount } = this.state;

    const amountFrom = isFromPersistent ? amount : tryConvert(amount, a => a / exchangeRate);
    const amountTo = isFromPersistent ? tryConvert(amount, a => a * exchangeRate) : amount;

    return (
      
      <div className="exchange-widget">
        <ExchangePocket
          isFromPocket
          pockets={pockets}
          amount={amountFrom}
          onPocketChange={this.handlePocketFromChange}
          onValueChange={this.handleValueFromChange} />
        <div className="exchange-rate">100 {pocketFrom.currency} = {100 * exchangeRate} {pocketTo.currency}</div>
        <ExchangePocket
          pockets={pockets}
          amount={amountTo}
          onPocketChange={this.handlePocketToChange}
          onValueChange={this.handleValueToChange} />
      </div>
    );
  }
}

_ExchangeWidget.propTypes = {
  // author: PropTypes.shape({
  //   description: PropTypes.object,
  //   github: PropTypes.string,
  //   linkedIn: PropTypes.string,
  //   name: PropTypes.string,
  // })
};

const mapStateToProps = state => ({
  pocketFrom: state.pocketFrom,
  pocketTo: state.pocketTo,
  rates: state.rates,
  exchangeRate: state.exchangeRate,
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRates,
  selectPocketFrom,
  selectPocketTo
}, dispatch)

const ExchangeWidget = connect(mapStateToProps, mapDispatchToProps)(_ExchangeWidget);

export default ExchangeWidget;