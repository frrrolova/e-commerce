import client from '@/client/client';
import { InfoDataCard } from '@/types';
import { mapPromoCodes } from '@/utils/mapPromoCodes';

class PromoService {
  async fetchPromoCodes(): Promise<InfoDataCard[]> {
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
