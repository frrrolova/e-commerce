import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import LoginIcon from '@mui/icons-material/Login';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { navLinksData, rightMenuData } from '../../routes/routeConstants';
import { useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { RootState, useAppSelector } from '../../store/store';

const pages = [navLinksData.home, navLinksData.catalog, navLinksData.about];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const shopName = useAppSelector((state: RootState) => state.shop?.name?.en || 'Plant Shop');

  const navigate = useNavigate();

  // TODO take @isLogged from store and update @menuData and @currentIcon
  const isLogged = false;

  const menuData = isLogged ? rightMenuData.isAuth : rightMenuData.notAuth;

  const currentIcon = isLogged ? <Avatar alt="User" src="/static/images/avatar/2.jpg" /> : <LoginIcon />;

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (_e: React.MouseEvent<HTMLLIElement | HTMLButtonElement, MouseEvent>, toUrl: string) => {
    if (toUrl !== 'backdropClick') {
      navigate(toUrl);
    }
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (_e: React.MouseEvent<HTMLLIElement, MouseEvent>, toUrl: string) => {
    if (toUrl !== 'backdropClick') {
      navigate(toUrl);
    }
    setAnchorElUser(null);
  };

  return (
    <AppBar position="static" className={styles.header}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            variant="h6"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.3rem',
            }}
          >
            {shopName}
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <MenuItem key={page.title} onClick={(e) => handleCloseNavMenu(e, page.url)}>
                  <Typography textAlign="center">{page.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '0.3rem',
            }}
          >
            Plant
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={(e) => handleCloseNavMenu(e, page.url)}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title={menuData.tooltipTitle}>
              <IconButton
                onClick={handleOpenUserMenu}
                className={styles.customIconButton}
                size="large"
                sx={{ p: 0 }}
                aria-label="login"
              >
                {currentIcon}
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {menuData.links.map((link) => (
                <MenuItem key={link.title} onClick={(e) => handleCloseUserMenu(e, link.url)}>
                  <Typography textAlign="center">{link.title}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default Header;
