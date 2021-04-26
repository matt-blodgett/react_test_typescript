import React from 'react';
import clsx from 'clsx';

import { useHistory } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import MainAppBar from './MainAppBar';
import MainDrawer from './MainDrawer';
import useStyles from './mainStyle';

import RouterView from '../router/RouterView';


export default function MainLayout () {
  const classes = useStyles();
  const history = useHistory();

  const [isDrawerOpen, toggleDrawer] = React.useState(false);

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
            icon: (<InboxIcon />)
          },
          {
            text: 'About',
            action: () => changeView('/about'),
            icon: (<MailIcon />)
          },
          {
            text: 'Tic Tac Toe',
            action: () => changeView('/tictactoe'),
            icon: (<MailIcon />)
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
