export enum Paths {
  HOME = '/',
  AUTH = '/login',
  REGISTER = '/registration',
  CATALOG = '/catalog',
  ABOUT = '/about',
  BASKET = '/basket',
  PROFILE = '/profile',
  PRODUCTS = '/products/:productId',
  NOT_FOUND = '/*',
}

export enum Titles {
  HOME = 'Home',
  REGISTER = 'Registration',
  AUTH = 'Login',
  LOGOUT = 'Logout',
  CATALOG = 'Catalog',
  ABOUT = 'About us',
  BASKET = 'Basket',
  PROFILE = 'Profile',
  PRODUCTS = 'Product',
}

export const navLinksData = {
  home: { url: Paths.HOME, title: Titles.HOME },
  catalog: { url: Paths.CATALOG, title: Titles.CATALOG },
  about: { url: Paths.ABOUT, title: Titles.ABOUT },
  basket: { url: Paths.BASKET, title: Titles.BASKET },
};

export const rightMenuData = {
  notAuth: {
    tooltipTitle: 'Login or Register',
    links: [
      { url: Paths.AUTH, title: Titles.AUTH },
      { url: Paths.REGISTER, title: Titles.REGISTER },
    ],
  },
  isAuth: {
    tooltipTitle: 'Profile or Logout',
    links: [
      { url: Paths.PROFILE, title: Titles.PROFILE },
      { url: Paths.AUTH, title: Titles.LOGOUT },
    ],
  },
};
