import client from '@/client/client';
import { mapPromoCodes } from '@/utils/mapPromoCodes';

class PromoService {
  async fetchPromoCodes() {
    try {
      const response = await client.getClient().cartDiscounts().get().execute();
      const codes = response.body.results;
      return mapPromoCodes(codes);
    } catch (error) {
      console.error('Error in fetchPromoCodes!', error);
      throw error;
    }
  }
}

export const promoService = new PromoService();
