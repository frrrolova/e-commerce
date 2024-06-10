import styles from './InfoCard.module.scss';
import { Paper, Typography, Box, Button } from '@mui/material';
import { InfoCardProps } from './types';
import { useNavigate } from 'react-router-dom';

function InfoCard({ data, button }: InfoCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    if (button) {
      navigate(button.url);
    }
  };

  return (
    <Box className={styles.container} data-testid={'info'}>
      <Paper elevation={3} className={styles.card}>
        <Box
          className={styles.content}
          sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, alignItems: 'center' }}
        >
          <Box component="img" className={styles.image} alt="Plant" src={data.imgPath} />
          <Box className={styles.description}>
            <Typography gutterBottom variant="h5" component="div" mt={4}>
              {data.heading}
            </Typography>
            {data.description && (
              <Typography variant="body2" color="text.secondary">
                {data.description}
              </Typography>
            )}
            <Typography variant="h6">{data.subHeading}</Typography>
            {button && (
              <Box>
                <Button variant="contained" color="primary" sx={{ mt: 2 }} onClick={handleClick}>
                  {button.label}
                </Button>
              </Box>
            )}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default InfoCard;
