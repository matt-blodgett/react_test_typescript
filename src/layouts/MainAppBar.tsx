import clsx from 'clsx';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Icon from '@material-ui/core/Icon';

import useStyles from './style';

type MainAppBarProps = {
  isDrawerOpen: boolean,
  onToggleDrawer: () => void
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
          <Icon>menu</Icon>
        </IconButton>
        <Typography variant="h6" noWrap>
          Generic Brand Name
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
