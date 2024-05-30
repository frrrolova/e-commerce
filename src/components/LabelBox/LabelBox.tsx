import { PropsWithChildren } from '@/types';
import { Box, Chip } from '@mui/material';
import Person2Icon from '@mui/icons-material/Person2';
import theme from '@/themes/theme';

type LabelBoxProps = PropsWithChildren & {
  label: string;
};

function LabelBox(props: LabelBoxProps) {
  return (
    <Box
      component={'fieldset'}
      sx={{
        position: 'relative',
        border: '1px solid',
        borderColor: theme.palette.primary.light,
        borderRadius: 2,
        padding: 1.5,
      }}
    >
      <legend>
        <Chip variant="outlined" label={props.label} icon={<Person2Icon />} />
      </legend>
      {props.children}
    </Box>
  );
}

export default LabelBox;
