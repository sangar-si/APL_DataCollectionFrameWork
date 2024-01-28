import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FactoryIcon from '@mui/icons-material/Factory';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const drawerWidth = 240;

function ResponsiveDrawer() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [expandedOption, setExpandedOption] = React.useState(null);
  const [selectedOption, setSelectedOption] = React.useState('Dashboard');

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMainOptionClick = (option) => {
    setExpandedOption(expandedOption === option ? null : option);
    setSelectedOption(option);

  };

  const mainListItems = [
    { mainOption: 'WPB', subOptions: ['Shift Report', 'MDT', 'DBT'] },
    { mainOption: 'SPB', subOptions: ['Shift Report', 'MDT', 'DBT'] },
    { mainOption: 'EB', subOptions: ['Shift Report', 'MDT', 'DBT'] },
    { mainOption: 'RB', subOptions: ['Shift Report', 'MDT', 'DBT'] }
  ];

  const drawer = (
    <div>
      <Toolbar />
      <Divider />
      <List>
        {mainListItems.map((mainListItem, index) => (
          <div key={mainListItem.mainOption}>
            <ListItem disablePadding onClick={() => handleMainOptionClick(mainListItem.mainOption)}>
              <ListItemButton>
                <ListItemIcon>
                  <FactoryIcon />
                </ListItemIcon>
                <ListItemText primary={mainListItem.mainOption} />
              </ListItemButton>
            </ListItem>
            {expandedOption === mainListItem.mainOption && mainListItem.subOptions.map((subOption, subIndex) => (
              <ListItem key={subOption} disablePadding sx={{ pl: 4 }} onClick={() => handleMainOptionClick(mainListItem.mainOption)}>
                <ListItemButton>
                  <ListItemIcon>
                    <AnalyticsIcon />
                  </ListItemIcon>
                  <ListItemText primary={subOption} />
                </ListItemButton>
              </ListItem>
            ))}
          </div>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: `calc(100% - ${drawerWidth}px)`,
          ml: `${drawerWidth}px`,
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {selectedOption}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: drawerWidth, flexShrink: 0 }}
        aria-label="mailbox folders"
      >
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: `calc(100% - ${drawerWidth}px)` }}
      >
        <Toolbar />
        <Typography paragraph>
            Text
        </Typography>
      </Box>
    </Box>
  );
}

export default ResponsiveDrawer;