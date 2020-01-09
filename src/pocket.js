import React from 'react';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

function Pocket() {
  // const [age, setAge] = React.useState('');

  // const inputLabel = React.useRef(null);
  // const [labelWidth, setLabelWidth] = React.useState(0);
  // React.useEffect(() => {
  //   setLabelWidth(inputLabel.current.offsetWidth);
  // }, []);

  const handleChange = event => {
    // setAge(event.target.value);

    console.log('tagget.value: ', event.target.value);
  };

  return (
    <div className="pocket">

      <Select
        labelId="demo-simple-select-label"
        id="demo-simple-select"
        // value={age}
        onChange={handleChange}
      >
        <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem>
      </Select>

      <TextField
        id="outlined-number"
        label="Number"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
      />


    </div>
  );
}

export default Pocket;
