import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

import useStyles from './mainStyle';

type MainAppBarProps = {
  isDrawerOpen: boolean,
  onToggleDrawer: Function
}

export default function MainAppBar (props: MainAppBarProps) {
  const classes = useStyles();

  return (
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: props.isDrawerOpen
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          edge="start"
          onClick={() => props.onToggleDrawer()}
          className={clsx(classes.menuButton)}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap>
          Persistent drawer
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
