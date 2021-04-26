import React from 'react';

import Button from '@material-ui/core/Button';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

import apiClient from '../api';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    apiVersionTitle: {
      fontWeight: 'normal'
    },
    button: {
      width: '200px',
      marginBottom: '5px'
    },
    buttonContainer: {
      marginTop: '10px',
      display: 'inline-flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }
  })
);


export default function Home () {
  const classes = useStyles();

  const [apiVersion, setApiVersion] = React.useState<string>('');

  const getApiVersion = (): void => {
    apiClient.get('/api/version').then(response => {
      setApiVersion(`v${response.data.version}`);
    }).catch(error => {
      console.log(error);
    });
  };

  const resetApiVersion = (): void => {
    setApiVersion('');
  };

  return (
    <div style={{margin: '10px', fontSize: '16px'}}>
      <h1>Home Page</h1>
      <div className={classes.apiVersionTitle}><b>API Version:</b> {apiVersion}</div>
      <div className={classes.buttonContainer}>
        <Button className={classes.button} variant="contained" color="primary" onClick={() => getApiVersion()}>Get Version</Button>
        <Button className={classes.button} variant="contained" color="secondary" onClick={() => resetApiVersion()}>Reset Version</Button>
      </div>
    </div>
  );
}
