import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import useStyles from './mainStyle';

type MainDrawerItem = {
  text: string,
  action: Function,
  icon: JSX.Element
}

type MainDrawerProps = {
  isDrawerOpen: boolean,
  onToggleDrawer: Function,
  drawerItems: Array<MainDrawerItem>
}

export default function MainDrawer (props: MainDrawerProps) {
  const classes = useStyles();

  return (
    <Drawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={props.isDrawerOpen}
      classes={{
        paper: classes.drawerPaper
      }}
    >

      <div className={classes.drawerHeader}>
        <Typography variant="h6" noWrap>
          Nav Menu
        </Typography>
      </div>

      <Divider />

      <List>
        {props.drawerItems.map((drawerItem) => (
          <ListItem button key={drawerItem.text} onClick={() => drawerItem.action()}>
            <ListItemIcon>{drawerItem.icon}</ListItemIcon>
            <ListItemText primary={drawerItem.text} />
          </ListItem>
        ))}
      </List>

      <Divider />

      <List>
      </List>

    </Drawer>
  );
}
