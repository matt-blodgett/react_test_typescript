import React from 'react';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import MainAppBar from './MainAppBar';
import MainDrawer from './MainDrawer';
import RouterView from '../router/RouterView';

import useStyles from './style';

export default function MainLayout () {
  const classes = useStyles();
  const history = useHistory();

  const [isDrawerOpen, toggleDrawer] = React.useState<boolean>(false);

  const onToggleDrawer = () : void => {
    toggleDrawer(!isDrawerOpen);
  };

  const changeView = (view: string) : void => {
    history.push(view);
  };

  return (
    <div>
      <CssBaseline />
      <MainAppBar
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => onToggleDrawer()}
      />
      <MainDrawer
        isDrawerOpen={isDrawerOpen}
        onToggleDrawer={() => onToggleDrawer()}
        drawerItems={[
          {
            text: 'Home',
            action: () => changeView('/'),
            icon: 'inbox'
          },
          {
            text: 'About',
            action: () => changeView('/about'),
            icon: 'mail'
          },
          {
            text: 'Tic Tac Toe',
            action: () => changeView('/tictactoe'),
            icon: 'star'
          }
        ]}
      />
      <main className={clsx(classes.content, {[classes.contentShift]: isDrawerOpen})}>
        <div className={classes.drawerHeader} />
        <RouterView />
      </main>
    </div>
  );
}
