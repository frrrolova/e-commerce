import { TCountryCode } from 'countries-list';

export const snackbarBasicParams = {
  style: { width: '300px' },
  anchorOrigin: { vertical: 'top' as const, horizontal: 'center' as const },
};

export const countriesList: TCountryCode[] = ['DE', 'AT', 'GB'];
