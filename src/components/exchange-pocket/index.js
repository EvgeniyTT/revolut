import React from 'react';
import PropTypes from 'prop-types';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import {pocketType} from '../../types';
import './styles.css';

export const amountInputTestId = 'amount-input';
export const calculationTestId = 'calculation';
export const labelTestId = 'label';

class ExchangePocket extends React.Component {
  handleAmountChange = (e) => {
    this.props.onValueChange(e.target.value);
  }

  handlePocketChange = (e) => {
    const selectedPocket = this.props.pockets.find(pocket => pocket.id === e.target.value);
    this.props.onPocketChange(selectedPocket);
  }

  render() {
    const {amount, total, pockets, isFromPocket, selectedPocket} = this.props;

    const label = isFromPocket ? 'from' : 'to';
    const action = isFromPocket ? '-' : '+';

    return (
      <div className="pocket" data-testid={`pocket-${label}`}>
        <div className="label" data-testid={labelTestId}>{label.toUpperCase()}</div>

        <FormControl>
          <InputLabel id="pocket">{label} pocket </InputLabel>
          <Select
            labelId="pocket"
            className="select"
            value={selectedPocket.id || ''}
            onChange={this.handlePocketChange}
          >
            {pockets.map(pocket => (
              <MenuItem value={pocket.id} key={pocket.id}>{ pocket.name }</MenuItem>
            ))}
          </Select>
        </FormControl>

        <div className="amount">
          <input
            className="amount-input"
            type="number"
            value={amount}
            min="0"
            onChange={this.handleAmountChange}
            data-testid={amountInputTestId}
          />
          <span className="amount-currency">{selectedPocket.currency}</span>
        </div>

        <div className="calculation" data-testid={calculationTestId}>
          <span>{selectedPocket.amount || 0}</span>
          <span className={`diff${action}`}> {action} {amount || 0}</span>
          <span className={`diff${action} total`}> = {total}</span>
          <span>{selectedPocket.currency}</span>
        </div>
      </div>
    );
  }
}

ExchangePocket.propTypes = {
  pockets: PropTypes.arrayOf(pocketType),
  selectedPocket: PropTypes.oneOfType([pocketType, PropTypes.shape({})]),
  isFromPocket: PropTypes.bool,
  amount: PropTypes.string,
  total: PropTypes.number,
  onValueChange: PropTypes.func,
  onPocketChange: PropTypes.func,
};

export default ExchangePocket;
