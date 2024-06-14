import { Paths } from '@/routes/routeConstants';

export enum PageData {
  TITLE_H1 = 'Bringing Nature Indoors',
  SUBTEXT = 'Step into a lush oasis of tranquility with our exquisite collection of indoor plants, where every leaf tells a story of beauty and natural elegance.',
  TITLE_PROMO = 'Promotions',
  TITLE_DISCOUNT = 'Our special offers',
  TOP_PLANT_ID = '254d8461-038a-4b0a-a9c5-8f1a9343a6c2',
  CATEGORY_ID = '30968be6-31ca-4b72-a1dd-294c99f73c0b',
  TO_CATALOG = 'To Catalog',
}

export enum ButtonLabels {
  LOGIN = 'Login',
  REGISTRATION = 'Registration',
}

export const InfoCardData = {
  heading: 'Summer time',
  imgPath: '/images/home/promo.webp',
  description: 'Take advantage of an additional discount during the summer using the promotional code:',
  subHeading: 'SUMMER2024',
};

export const InfoCardBtn = {
  label: 'To Catalog',
  url: Paths.CATALOG,
};
