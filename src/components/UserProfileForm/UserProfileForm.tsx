import { Customer } from '@commercetools/platform-sdk';
import { Box, SxProps, Tab, Tabs, TabsOwnProps } from '@mui/material';
import { useState } from 'react';
import TabPanel from '../TabPanel/TabPanel';
import { UserDetails } from './UserDetails/UserDetails';
import { UserAddresses } from './UserAddresses/UserAddresses';

function UserProfileForm({ userData, sxProps }: { userData: Customer; sxProps?: SxProps }) {
  const [tabValue, setTabValue] = useState(0);
  const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  function a11yProps(index: number, orientation: TabsOwnProps['orientation'] = 'horizontal') {
    return {
      id: `${orientation}-tab-${index}`,
      'aria-controls': `${orientation}-tabpanel-${index}`,
    };
  }

  return (
    <Box
      sx={{
        padding: {
          xs: 1,
          md: 3,
        },
        border: '2px solid',
        borderColor: 'divider',
        backgroundColor: '#dedbdb0d',
        borderRadius: '7px',
        ...sxProps,
      }}
    >
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
          mb: {
            xs: 0,
            sm: 2,
          },
        }}
      >
        <Tabs orientation="horizontal" value={tabValue} onChange={handleTabChange} aria-label="tabs">
          <Tab label="Personal Info" {...a11yProps(0)} />
          <Tab label="Addresses" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={tabValue} index={0}>
        <UserDetails userData={userData} />
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <UserAddresses userData={userData} />
      </TabPanel>
    </Box>
  );
}

export default UserProfileForm;
