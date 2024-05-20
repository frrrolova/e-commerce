import styles from './Title.module.scss';
import { Typography } from '@mui/material';

interface TitleProps {
  title: string;
}

function Title({ title }: TitleProps) {
  return (
    <Typography variant="h4" className={styles.title}>
      {title}
    </Typography>
  );
}

export default Title;
