export enum Paths {
  HOME = '/',
  AUTH = '/login',
  REGISTER = '/registration',
  CATALOG = '/catalog',
  ABOUT = '/about',
  BASKET = '/basket',
  PROFILE = '/profile',
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
}

export const navLinksData = {
  home: { url: Paths.HOME, title: Titles.HOME },
  login: { url: Paths.AUTH, title: Titles.AUTH },
  register: { url: Paths.REGISTER, title: Titles.REGISTER },
  catalog: { url: Paths.CATALOG, title: Titles.CATALOG },
  about: { url: Paths.ABOUT, title: Titles.ABOUT },
  basket: { url: Paths.BASKET, title: Titles.BASKET },
  profile: { url: Paths.PROFILE, title: Titles.PROFILE },
  logout: { url: Paths.AUTH, title: Titles.LOGOUT },
};
