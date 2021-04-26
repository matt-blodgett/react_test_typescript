import React from 'react';

import Button from '@material-ui/core/Button';

export default function Home () {
  const [value, setValue] = React.useState(0);

  const onValueClick = () => {
    setValue(value + 1);
  };

  return (
    <div>
      <h1>Home Page</h1>
      <div>Value {value}</div>
      <Button variant="contained" color="primary" onClick={() => onValueClick()}>Increment</Button>
    </div>
  );
}
