import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import './styles.css';


class ExchangePocket extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { selectedPocket: { id: '' } };
  }

  handleChange = (e) => {
    this.props.onValueChange(e.target.value);
  }

  handlePocketChange = (e) => {
    const selectedPocket = this.props.pockets.find(pocket => pocket.id === e.target.value);
    this.setState({ selectedPocket });
    this.props.onPocketChange(selectedPocket);
  }


  render() {
    const { amount, pockets, isFromPocket } = this.props;
    const selectedPocket = this.state.selectedPocket;

    const label = isFromPocket ? 'FROM' : 'TO';
    const action = isFromPocket ? '-' : '+';
    const actionFn = isFromPocket ? (a,b) => a-b : (a,b) => a + b;

return (
    <div className="pocket">
      <div className="pocket__label">{label}</div>
      <Select
        className="pocket__select"
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedPocket.id}
        onChange={this.handlePocketChange}
      >
        {pockets.map(pocket => (
          <MenuItem value={pocket.id} key={pocket.id}>{ pocket.name }</MenuItem>
        ))}
      </Select>

      <div className="pocket__amount"> 
        <TextField
          className="pocket__amount-input"
          id="outlined-number"
          label="Number"
          type="number"
          InputLabelProps={{
            shrink: true,
          }}
          variant="outlined"
          value={amount}
          onChange={this.handleChange} 
        />
        <span>{selectedPocket.currency}</span>
      </div>

      <div>
        <span>{selectedPocket.amount}</span>
        <span> {action} {amount} = {actionFn(selectedPocket.amount, amount)}</span>
        <span>{selectedPocket.currency}</span>
      </div>

    </div>
  );
  }
}

export default ExchangePocket;
