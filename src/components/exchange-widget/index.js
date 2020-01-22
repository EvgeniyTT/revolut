import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import Button from '@material-ui/core/Button';
import ExchangePocket from '../exchange-pocket';
import {fetchRates} from '../../services';
import {tryConvert, parseToTwoDecimal} from '../../utils/helpers';
import {
  exchange,
  selectPocketFrom,
  selectPocketTo,
} from '../../store/actions';
import {pocketType} from '../../types';
import './styles.css';

class _ExchangeWidget extends React.Component {
  constructor(props) {
    super(props);
    this.state = {amount: '0.00', isFromPersistent: true};
  }

  handlePocketFromChange = selectedPocket => {
    this.props.selectPocketFrom(selectedPocket);
    this.props.fetchRates(selectedPocket.currency);
  }

  handlePocketToChange = selectedPocket => {
    this.props.selectPocketTo(selectedPocket);
  }

  handleAmountFromChange = (amount) => {
    this.setState({isFromPersistent: true, amount});
  }

  handleAmountToChange = (amount) => {
    this.setState({isFromPersistent: false, amount});
  }

  render() {
    const {pockets, exchangeRate, pocketFrom, pocketTo, exchange} = this.props;
    const {isFromPersistent, amount} = this.state;

    const amountFrom = parseToTwoDecimal(isFromPersistent ? amount : tryConvert(amount, a => a / exchangeRate));
    const amountTo = parseToTwoDecimal(isFromPersistent ? tryConvert(amount, a => a * exchangeRate) : amount);

    const totalFrom = parseToTwoDecimal(parseFloat(pocketFrom.amount || 0) - (amountFrom || 0));
    const totalTo = parseToTwoDecimal(parseFloat(pocketTo.amount || 0) + (amountTo || 0));

    const canExchange = totalFrom > 0 &&
                        pocketTo.id !== pocketFrom.id &&
                        amountFrom > 0 &&
                        amountTo > 0;

    return (
      <div className="exchange-widget">
        <ExchangePocket
          isFromPocket
          pockets={pockets}
          selectedPocket={pocketFrom}
          amount={amountFrom.toString()}
          total={totalFrom}
          onPocketChange={this.handlePocketFromChange}
          onValueChange={this.handleAmountFromChange} />

        <div className="exchange">
          <span className="exchange-rate-label">Exchange rate</span>
          <div className="exchange-rate">
            100 {pocketFrom.currency} = {(100 * exchangeRate).toFixed(2)} {pocketTo.currency}
          </div>
          <Button variant="contained" color="primary" disabled={!canExchange} onClick={
            () => {
              exchange({
                pocketFrom,
                totalFrom,
                pocketTo,
                totalTo,
              });
            }
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
          onValueChange={this.handleAmountToChange} />
      </div>
    );
  }
}

_ExchangeWidget.propTypes = {
  pockets: PropTypes.arrayOf(pocketType),
  exchangeRate: PropTypes.number,
  pocketFrom: pocketType,
  pocketTo: pocketType,
  exchange: PropTypes.func,
  selectPocketFrom: PropTypes.func,
  selectPocketTo: PropTypes.func,
  fetchRates: PropTypes.func,
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
}, dispatch);

const ExchangeWidget = connect(mapStateToProps, mapDispatchToProps)(_ExchangeWidget);

export default ExchangeWidget;
