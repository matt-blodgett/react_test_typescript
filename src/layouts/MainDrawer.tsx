import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon';

import useStyles from './style';

type MainDrawerItem = {
  text: string,
  icon: string,
  action: () => void
}

type MainDrawerProps = {
  isDrawerOpen: boolean,
  onToggleDrawer: () => void,
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
          <ListItem className={classes.drawerItem} key={drawerItem.text} button onClick={() => drawerItem.action()}>
            <ListItemIcon><Icon>{drawerItem.icon}</Icon></ListItemIcon>
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
