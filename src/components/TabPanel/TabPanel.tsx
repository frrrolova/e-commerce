import { Box, TabsOwnProps } from '@mui/material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
  orientation?: TabsOwnProps['orientation'];
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, orientation, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`${orientation}-tabpanel-${index}`}
      aria-labelledby={`${orientation}-tab-${index}`}
      style={{ width: '100%' }}
      {...other}
    >
      {value === index && (
        <Box
          sx={
            orientation === 'vertical'
              ? {
                  p: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  // justifyContent: 'center',
                  // alignItems: 'center',
                  width: '100%',
                  marginLeft: 2,
                }
              : {
                  p: 1,
                  // display: 'flex', justifyContent: 'center', width: '100%', marginLeft: 2
                }
          }
        >
          {children}
        </Box>
      )}
    </div>
  );
}

export default TabPanel;
