import React from 'react';
import PropTypes from 'prop-types';
import Input from '@material-ui/core/Input';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import {pocketType} from '../../types';
import './styles.css';

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

    const label = isFromPocket ? 'FROM' : 'TO';
    const action = isFromPocket ? '-' : '+';

    return (
      <div className="pocket">
        <div className="label">{label}</div>
        <Select
          className="select"
          value={selectedPocket.id || ''}
          onChange={this.handlePocketChange}
        >
          {pockets.map(pocket => (
            <MenuItem value={pocket.id} key={pocket.id}>{ pocket.name }</MenuItem>
          ))}
        </Select>

        <div className="amount">
          <Input
            className="amount-input"
            type="number"
            value={amount}
            min="0"
            onChange={this.handleAmountChange}
          />
          <span className="amount-currency">{selectedPocket.currency}</span>
        </div>

        <div className="calculation">
          <span>{selectedPocket.amount || 0}</span>
          <span className={`diff${action}`}> {action} {amount || 0}</span>
          <span className={`diff${action} total`}> = {total} </span>
          <span>{selectedPocket.currency}</span>
        </div>
      </div>
    );
  }
}

ExchangePocket.propTypes = {
  pockets: PropTypes.arrayOf(pocketType),
  selectedPocket: pocketType,
  isFromPocket: PropTypes.bool,
  amount: PropTypes.string,
  total: PropTypes.number,
  onValueChange: PropTypes.func,
  onPocketChange: PropTypes.func,
};

export default ExchangePocket;
