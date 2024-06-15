import { PromoData } from '@/types';
import { CartDiscount } from '@commercetools/platform-sdk';

export function mapPromoCodes(promoResponse: CartDiscount[]): PromoData[] {
  return promoResponse.map((code, index) => ({
    id: code.id,
    heading: code.name['en-GB'],
    imgPath: `/images/home/promo-${index}.webp`,
    description: code.description ? code.description['en-GB'] : '',
    subHeading: code.key || '',
  }));
}
