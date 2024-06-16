import theme from '@/themes/theme';
import { Avatar, Box, ListItem, ListItemAvatar, Typography, useMediaQuery } from '@mui/material';
import Counter from '../Counter/Counter';
import { LineItem } from '@commercetools/platform-sdk';
import RemoveBtn from '../RemoveBtn/RemoveBtn';
import { centsInEuro, currency } from '@/core/commonConstants';

interface BasketProductProps {
  product: LineItem;
  onRemoveClick: () => void;
  onQuantityChange: (quantity: number) => void;
  isCounterLoading: boolean;
}

function BasketProduct({ product, onRemoveClick, onQuantityChange, isCounterLoading }: BasketProductProps) {
  const drawPrices = () => {
    return (
      <>
        <Typography
          sx={{
            textDecoration: product.price.discounted ? 'line-through' : 'none',
            lineHeight: '1',
            fontSize: 'inherit',
          }}
        >{`${(product.price.value.centAmount / centsInEuro) * product.quantity} ${currency}`}</Typography>
        {Boolean(product.price.discounted) && (
          <Typography
            sx={{
              color: theme.palette.primary.main,
              fontWeight: 600,
              ml: 1,
              lineHeight: '1',
              fontSize: 'inherit',
            }}
          >
            {`${(product.totalPrice.centAmount || 0) / centsInEuro} ${currency}`}
          </Typography>
        )}
      </>
    );
  };

  const matchesExtraSmallScreen = useMediaQuery('(max-width:350px)');
  const matchesSmallScreen = useMediaQuery('(max-width:700px)');
  const matchesPricesTextContent = useMediaQuery('(max-width:450px)');

  return (
    <ListItem
      key={`${product.id}-cart-prod`}
      sx={{
        borderBottom: `1px dotted ${theme.palette.divider}`,
        display: 'flex',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        width: '100%',
        paddingX: { xs: 1, sm: 2 },
        mb: {
          xs: 1.5,
          sm: 0,
        },
      }}
    >
      <ListItemAvatar sx={{ mr: 3, alignSelf: 'center' }}>
        <Avatar
          alt={product.name['en-GB']}
          src={product.variant.images?.[0].url}
          sx={{
            width: matchesExtraSmallScreen ? '75px' : { xs: '90px', md: '120px' },
            height: matchesExtraSmallScreen ? '75px' : { xs: '90px', md: '120px' },
          }}
        />
      </ListItemAvatar>
      <Box
        display="flex"
        justifyContent="space-between"
        width="100%"
        sx={{
          flexDirection: matchesSmallScreen ? 'column' : 'row',
          alignItems: matchesSmallScreen ? 'flex-start' : 'center',
        }}
        gap={matchesSmallScreen ? 1.5 : 0}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            width: '90%',
          }}
        >
          <Box>
            <Typography
              sx={{
                fontSize: matchesExtraSmallScreen ? '1.1rem' : '1.3rem',
                fontWeight: 600,
                mb: 1,
              }}
            >
              {product.name['en-GB']}
            </Typography>
            <Typography
              color={theme.palette.grey[400]}
              sx={{
                fontSize: matchesPricesTextContent ? '0.8rem' : '1rem',
                fontWeight: 600,
              }}
            >
              {product.variant.attributes?.map((attr) => {
                return `${attr.name}: ${attr.value['label']}; `;
              })}
            </Typography>
            <Box display="flex" alignItems="baseline" color={theme.palette.grey[500]} fontSize={'0.8rem'}>
              per item:&nbsp;
              <Typography
                sx={{
                  textDecoration: product.price.discounted ? 'line-through' : 'none',
                  fontSize: '0.8rem',
                }}
              >{`${product.price.value.centAmount / centsInEuro} ${currency}`}</Typography>
              {Boolean(product.price.discounted) && (
                <Typography sx={{ fontSize: '0.8rem', fontWeight: 600, ml: 1 }}>
                  {`${(product.price.discounted?.value.centAmount || 0) / centsInEuro} ${currency}`}
                </Typography>
              )}
            </Box>
          </Box>
        </Box>
        <Box
          display="flex"
          gap="20px"
          alignItems={matchesPricesTextContent ? 'flex-start' : 'center'}
          flexDirection={matchesPricesTextContent ? 'column' : 'row'}
        >
          <Counter
            quantity={product.quantity}
            isLoading={isCounterLoading}
            disable={false}
            onDecreaseClick={() => {
              const currentQuantity = product.quantity - 1;
              onQuantityChange(currentQuantity);
            }}
            onIncreaseClick={() => {
              const currentQuantity = product.quantity + 1;
              onQuantityChange(currentQuantity);
            }}
            onValueChange={(val) => {
              if (val > 0) {
                onQuantityChange(val);
              }
            }}
          />
          <Box
            alignItems="baseline"
            whiteSpace="nowrap"
            pr={1}
            sx={{
              display: matchesPricesTextContent ? 'flex' : 'none',
            }}
          >
            {drawPrices()}
          </Box>
        </Box>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          minWidth: { sm: '160px' },
          minHeight: '100%',
          ml: matchesSmallScreen ? 0 : 2.5,
          fontSize: { xs: '1.1rem', sm: '1.4rem' },
        }}
      >
        <RemoveBtn onClick={onRemoveClick} />
        <Box
          alignItems="baseline"
          whiteSpace="nowrap"
          pr={1}
          sx={{
            display: matchesPricesTextContent ? 'none' : 'flex',
          }}
        >
          {drawPrices()}
        </Box>
      </Box>
    </ListItem>
  );
}

export default BasketProduct;
