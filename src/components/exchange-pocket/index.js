import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';


class ExchangePocket extends React.Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
    this.state = { age: '', selectedPocketId: '' };
  }

  handleChange = (e) => {
    this.props.onValueChange(e.target.value);
  }

  handlePocketChange = (e) => {
    const selectedPocketId = this.props.pockets.find(pocket => pocket.id === e.target.value).id;
    this.setState({ selectedPocketId });
    this.props.onPocketChange(selectedPocketId);
  }


  render() {
    const temperature = this.props.temperature;
    const scale = this.props.scale;
    const pockets = this.props.pockets;
    const selectedPocketId = this.state.selectedPocketId;

return (
    <div className="pocket">

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        value={selectedPocketId}
        onChange={this.handlePocketChange}
      >
        {pockets.map(pocket => (
          <MenuItem value={pocket.id} key={pocket.id}>{ pocket.name }</MenuItem>
        ))}
      </Select>

      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        value={temperature}
        onChange={this.handleChange} 
      />


    </div>
  );
  }
}

export default ExchangePocket;
