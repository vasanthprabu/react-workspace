import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import { Link as RouterLink,Link } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, useTheme,createMuiTheme,MuiThemeProvider } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Users from '@material-ui/icons/PeopleAlt'
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Badge from '@material-ui/core/Badge';
import PieChartRoundedIcon from '@material-ui/icons/PieChartRounded';
import BugReportIcon from '@material-ui/icons/BugReport';
import store from 'store';
import { useHistory } from 'react-router-dom';

const drawerWidth = 240;

function ListItemLink(props) {
    const { icon, primary, to } = props;
    const renderLink = React.useMemo(
      () => React.forwardRef((itemProps, ref) => <RouterLink to={to} ref={ref} {...itemProps} />),
      [to],
    );
  
    return (
      <li>
        <ListItem button component={renderLink}>
          {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText primary={primary} />
        </ListItem>
      </li>
    );
  }

  ListItemLink.propTypes = {
    icon: PropTypes.element,
    primary: PropTypes.string.isRequired,
    to: PropTypes.string.isRequired,
  };

  
const theme = createMuiTheme({
  overrides: {
    // Style sheet name ⚛️
    MuiMenuItem: {
      // Name of the rule
      root: {
        // Some CSS
        fontSize: 15,
      },
    },
    MuiSelect:{
      root: {
        // Some CSS
        fontSize: 15,
      },
    },
    MuiListItem: {
      root: {
        "&$selected": { textDecoration: "underline" }
      }
    },
  },
});

const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: 'hidden',
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up('sm')]: {
        width: theme.spacing(9) + 1,
      },
    },
    toolbar: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-end',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      paddingLeft:'3%',
      flexGrow: 1,
      padding: theme.spacing(3),
    },
    
    title: {
      flexGrow: 1,
      textAlign:"left",
    },
  }));

function NavBar() {

    const classes = useStyles();
    const history = useHistory();
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const openanchorEl = Boolean(anchorEl);
    const handleDrawerOpen = () => {
      setOpen(true);
    };
  
  const handleDrawerClose = () => {
      setOpen(false);
    };
 

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = () => {
    setAnchorEl(null);
    store.set('loggedIn',false);
    history.push('/login');
  };

  

  return (
      
    <div className={classes.root}>
    <CssBaseline />
    <AppBar
      position="fixed"
      className={clsx(classes.appBar, {
        [classes.appBarShift]: open,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          onClick={handleDrawerOpen}
          edge="start"
          className={clsx(classes.menuButton, {
            [classes.hide]: open,
          })}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" className={classes.title}>
          CCS Request Tracker
        </Typography>
        <div>
          <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton>

              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={openanchorEl}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleLogOut}>Logout</MenuItem>
              </Menu>
            </div>
      </Toolbar>
    </AppBar>
    <MuiThemeProvider theme={theme}>
    <Drawer
      variant="permanent"
      className={clsx(classes.drawer, {
        [classes.drawerOpen]: open,
        [classes.drawerClose]: !open,
      })}
      classes={{
        paper: clsx({
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        }),
      }}
    >
      <div className={classes.toolbar}>
        <IconButton onClick={handleDrawerClose}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </div>
      <Divider />

      {/* <Paper elevation={0}>
          <List aria-label="main mailbox folders">
            <ListItemLink to="/TicketMaster" primary="Ticket Master" icon={<MailIcon />} />
            <ListItemLink to="/ChartsShowcase" primary="Charts Showcase" icon={<InboxIcon />} />
          </List>
          <Divider />
          <List aria-label="secondary mailbox folders">
          <ListItemLink to="/ChartsShowcase" primary="Maintenance" icon={<Users />} />
          </List>
      </Paper> */}

      
       <List>
          {['TicketMaster', 'ChartsShowcase'].map((text, index) => (
            <ListItem button key={text} component={props => <Link {...props} to={text} />}>
              <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <PieChartRoundedIcon />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
        
          ))}
        </List>
        <Divider />
        <List>
          {['BugReport','Maintenance'].map((text, index) => (
            <ListItem button key={text} component={props => <Link {...props} to={text}  />}>
              <ListItemIcon>{index % 2 === 0 ? <BugReportIcon /> : <Users />}</ListItemIcon>
              <ListItemText primary={text} />
            </ListItem>
          ))}
        </List> 

    </Drawer>
    </MuiThemeProvider>
    <main style={{padding:"0px"}} className={classes.content}>
        <div className={classes.toolbar} />
    </main>
  </div>
  );
}

export default NavBar;
