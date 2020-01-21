import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ExchangePocket from '../exchange-pocket';
import { fetchRates } from '../../services';
import {
  exchange,
  selectPocketFrom,
  selectPocketTo,
} from '../../store/actions';
import { tryConvert, parseToTwoDecimal } from '../../helpers';
import Button from '@material-ui/core/Button';
import './styles.css';

class _ExchangeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = { amount: '0.00', isFromPersistent: true };
  }

  handlePocketFromChange = selectedPocket => {
    this.props.selectPocketFrom(selectedPocket);
    this.props.fetchRates(selectedPocket.currency);
  }

  handlePocketToChange = selectedPocket => {
    this.props.selectPocketTo(selectedPocket);
  }

  handleValueFromChange = (amount) => {
    this.setState({ isFromPersistent: true, amount});
  }

  handleValueToChange = (amount) => {
    this.setState({ isFromPersistent: false, amount });
  }

  render() {
    const { pockets, exchangeRate, pocketFrom, pocketTo, exchange } = this.props;
    const { isFromPersistent, amount } = this.state;

    const amountFrom = parseToTwoDecimal(isFromPersistent ? amount : tryConvert(amount, a => a / exchangeRate));
    const amountTo = parseToTwoDecimal(isFromPersistent ? tryConvert(amount, a => a * exchangeRate) : amount);

    const totalFrom = parseToTwoDecimal(parseFloat(pocketFrom.amount || 0) - (amountFrom || 0));
    const totalTo = parseToTwoDecimal(parseFloat(pocketTo.amount || 0) + (amountTo || 0));

    return (
      
      <div className="exchange-widget">
        <ExchangePocket
          isFromPocket
          pockets={pockets}
          selectedPocket={pocketFrom}
          amount={amountFrom.toString()}
          total={totalFrom}
          onPocketChange={this.handlePocketFromChange}
          onValueChange={this.handleValueFromChange} />

        <div className="exchange">
          <span className="exchange-rate-label">Exchange rate</span>
          <div className="exchange-rate">100 {pocketFrom.currency} = {(100 * exchangeRate).toFixed(2)} {pocketTo.currency}</div>
          <Button variant="contained" color="primary" onClick={
            () => { exchange({
              pocketFrom,
              totalFrom,
              pocketTo,
              totalTo
            })} 
          }>
            Exchange
          </Button>
        </div>

        <ExchangePocket
          pockets={pockets}
          selectedPocket={pocketTo}
          amount={amountTo.toString()}
          total={totalTo}
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
  pockets: state.pockets,
  pocketFrom: state.pocketFrom,
  pocketTo: state.pocketTo,
  rates: state.rates,
  exchangeRate: state.exchangeRate,
});

export const mapDispatchToProps = dispatch => bindActionCreators({
  fetchRates,
  selectPocketFrom,
  selectPocketTo,
  exchange,
}, dispatch)

const ExchangeWidget = connect(mapStateToProps, mapDispatchToProps)(_ExchangeWidget);

export default ExchangeWidget;
