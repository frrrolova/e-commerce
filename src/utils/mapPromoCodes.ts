import { InfoDataCard } from '@/types';
import { CartDiscount } from '@commercetools/platform-sdk';
import { locale } from '@/core/commonConstants';

export function mapPromoCodes(promoResponse: CartDiscount[]): InfoDataCard[] {
  return promoResponse.map((code, index) => ({
    id: code.id,
    heading: code.name[locale],
    imgPath: `/images/home/promo-${index}.webp`,
    description: code.description ? code.description[locale] : '',
    subHeading: code.key || '',
  }));
}
