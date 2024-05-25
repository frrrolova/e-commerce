import { useEffect, useState } from 'react';
import { Box, Container, Typography } from '@mui/material';
import ProductCard from '@/components/ProductCard/ProductCard';
import { Product as ProductType } from '@/types';
import { productService } from '@/services/productService';

function Product() {
  const [product, setProduct] = useState<ProductType | null>(null);

  const loadProduct = async (productID: string) => {
    try {
      const productData = await productService.fetchProduct(productID);
      setProduct(productData);
      console.log(productData);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    loadProduct('013f2c11-a4ec-47a6-93d6-a72f52776cd2');
  }, []);

  if (product) {
    return (
      <>
        <Box>
          <Typography color="error">Product</Typography>
          <Container maxWidth="md">
            <ProductCard product={product} />
          </Container>
        </Box>
      </>
    );
  }
}

export default Product;
