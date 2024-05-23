import { catalogService } from '@/services/catalogService';
import { useEffect } from 'react';

function Catalog() {
  useEffect(() => {
    const loadProducts = async () => {
      try {
        const productData = await catalogService.fetchProducts();
        console.log(productData);
      } catch (err) {
        console.log('Failed to fetch products');
      } finally {
        console.log('Data is fetched');
      }
    };

    loadProducts();
  }, []);

  return (
    <>
      <div>Catalog</div>
    </>
  );
}

export default Catalog;
