import styles from './InfoCard.module.scss';
import { Paper, Typography, Box } from '@mui/material';
import { InfoCardProps } from './types';

function InfoCard({ data, button }: InfoCardProps) {
  return (
    <Box className={styles.container}>
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
            {button && <Box sx={{ mt: 1 }}>{button}</Box>}
          </Box>
        </Box>
      </Paper>
    </Box>
  );
}

export default InfoCard;
