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
import { Paths, navLinksData, rightMenuData } from '@/routes/routeConstants';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './Header.module.scss';
import { RootState, useAppDispatch, useAppSelector } from '@/store/store';
import { useEffect, useState } from 'react';
import LogoImg from '/images/logo.svg';
import { logout } from '@/store/slices/user/userSlice';

const pages = [navLinksData.home, navLinksData.catalog, navLinksData.about];

// use totalLineItemQuantity from cart in store (useAppSelector((store) => store.cart.cart?.totalLineItemQuantity)) to get total count of products in cart

function Header() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const [activePage, setActivePage] = useState(location.pathname);

  const user = useAppSelector((state: RootState) => state.user.user);

  const isLogged = !!user;

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
      if (toUrl === Paths.AUTH) {
        dispatch(logout());
      }

      navigate(toUrl);
    }
    setAnchorElUser(null);
  };

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsScrolled(scrollTop > 0);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    setActivePage(location.pathname);
  }, [location.pathname]);

  const handleLogoClick = () => {
    navigate(Paths.HOME);
  };

  return (
    <AppBar position="fixed" className={styles.header} data-scrolled={isScrolled}>
      <Container maxWidth="xl">
        <Toolbar disableGutters className={styles.toolbar}>
          {/* Logo on md-screen */}
          <Box
            className={styles.logoBox}
            sx={{ display: { xs: 'none', md: 'flex', flex: '1 1 0' } }}
            onClick={handleLogoClick}
          >
            <img src={LogoImg} className={styles.logo} alt="Logo" loading="lazy" />
            <Typography
              variant="h6"
              data-testid="shop-name"
              noWrap
              sx={{
                display: { xs: 'none', md: 'flex' },
                // fontFamily: 'monospace',
                fontWeight: 600,
                letterSpacing: '0.1rem',
              }}
            >
              Plantastic
            </Typography>
          </Box>

          {/* Left Dropdown-Menu on small screen */}
          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none', flex: '1 1 0' } }}>
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
              data-testid="menu-left"
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
                  <Typography
                    data-testid={`menu-item-${page.title}`}
                    textAlign="center"
                    className={activePage === page.url ? styles.activeMenuItem : ''}
                  >
                    {page.title}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>

          {/*Logo on small screen */}
          <Box className={styles.logoBox} sx={{ display: { xs: 'flex', md: 'none' } }} onClick={handleLogoClick}>
            <img src={LogoImg} className={styles.logo} alt="Logo" loading="lazy" />
            <Typography
              className={styles.logoText}
              variant="h5"
              noWrap
              sx={{
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                // fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '0.2rem',
              }}
            >
              Plantastic
            </Typography>
          </Box>

          {/* Navigation Buttons on md-screen */}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }} className={styles.navMd}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={(e) => handleCloseNavMenu(e, page.url)}
                sx={{
                  my: 2,
                  color: 'white',
                  display: 'block',
                }}
                className={activePage === page.url ? styles.activeMenuItem : ''}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* Right Dropdown-Menu */}
          <Box sx={{ display: 'flex', flex: '1 1 0', justifyContent: 'flex-end' }}>
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
                  <Typography textAlign="center" className={activePage === link.url ? styles.activeMenuItem : ''}>
                    {link.title}
                  </Typography>
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
