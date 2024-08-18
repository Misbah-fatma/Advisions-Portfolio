import React from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Button, Menu, MenuItem, useMediaQuery, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import LogoutIcon from '@mui/icons-material/Logout';

const Header = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [adminMenuAnchorEl, setAdminMenuAnchorEl] = React.useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const token = localStorage.getItem('token');

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleAdminMenuClick = (event) => {
    setAdminMenuAnchorEl(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAdminMenuAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <>
    <AppBar position="sticky" color="inherit">
      <Toolbar>
        <Link to="/" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
          <img src="/logo10.png" alt="Logo" style={{ height: 40, marginRight: 16 }} />
        </Link>
        {isMobile ? (
          <>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleMenuClick}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              sx={{ mt: 2 }}
            >
              <MenuItem component={Link} to="/" onClick={handleMenuClose}>Home</MenuItem>
              <MenuItem component={Link} to="/blogs" onClick={handleMenuClose}>Blogs</MenuItem>
              <MenuItem component={Link} to="/services" onClick={handleMenuClose}>Services</MenuItem>
              {token ? (
                <>
                  <MenuItem onClick={handleAdminMenuClick}>
                    <DashboardIcon /> Admin Dashboard
                  </MenuItem>
                  <Menu
                    anchorEl={adminMenuAnchorEl}
                    open={Boolean(adminMenuAnchorEl)}
                    onClose={handleAdminMenuClose}
                    sx={{ mt: 2 }}
                  >
                    <MenuItem onClick={handleLogout}>
                      <LogoutIcon  /> Logout
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                <MenuItem component={Link} to="/login" onClick={handleMenuClose}>Login</MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Button color="inherit" component={Link} to="/" style={{ margin: '0 8px' }}>Home</Button>
            <Button color="inherit" component={Link} to="/blogs" style={{ margin: '0 8px' }}>Blogs</Button>
            <Button color="inherit" component={Link} to="/services" style={{ margin: '0 8px' }}>Services</Button>
            {token ? (
              <div style={{ position: 'relative' }}>
                <Button
                  color="inherit"
                  onClick={handleAdminMenuClick}
                  style={{ margin: '0 8px' }}
                >
                  <DashboardIcon />
                </Button>
                <Menu
                  anchorEl={adminMenuAnchorEl}
                  open={Boolean(adminMenuAnchorEl)}
                  onClose={handleAdminMenuClose}
                  sx={{ mt: 2 }}
                >
                  <MenuItem component={Link} to="/admin" onClick={handleAdminMenuClose}>
                    Admin Dashboard
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                  <LogoutIcon sx={{ color: 'red', mr: 1 }} /> Logout
                  </MenuItem>
                </Menu>
              </div>
            ) : (
              <Button color="inherit" component={Link} to="/login" style={{ margin: '0 8px' }}>Login</Button>
            )}
          </div>
        )}
      </Toolbar>
      
    </AppBar>
     {/* <nav class="navbar navbar-expand-lg navbar-dark ftco_navbar bg-dark ftco-navbar-light" id="ftco-navbar">
	    <div class="container">
	      <a class="navbar-brand" href="index.html">Evans</a>
	      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#ftco-nav" aria-controls="ftco-nav" aria-expanded="false" aria-label="Toggle navigation">
	        <span class="oi oi-menu"></span> Menu
	      </button>

	      <div class="collapse navbar-collapse" id="ftco-nav">
	        <ul class="navbar-nav ml-auto">
	        	<li class="nav-item active"><a href="about.html" class="nav-link">About</a></li>
	        	<li class="nav-item"><a href="work.html" class="nav-link">Work</a></li>
	          <li class="nav-item"><a href="contact.html" class="nav-link">Contact</a></li>
	        </ul>
	      </div>
	    </div>
	  </nav> */}

    </>
  );
};

export default Header;
