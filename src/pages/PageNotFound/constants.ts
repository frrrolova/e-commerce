import { Paths } from '@/routes/routeConstants';

export enum InfoCardData {
  id = 'not-found-id',
  heading = 'Oops!',
  imgPath = '/images/notFound/notFound.webp',
  subHeading = 'The page you requested was not found!',
}

export const InfoCardBtn = {
  label: 'Home',
  url: Paths.HOME,
};
