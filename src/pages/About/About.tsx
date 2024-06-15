import { Box, Container, Typography, Link, Paper } from '@mui/material';
import Logo from '/images/rs-logo.svg';
import TeamMemberCard from '@/components/TeamMemberCard/TeamMemberCard';
import { members } from './data';
import { aboutConstants } from './constants';

function About() {
  return (
    <>
      <Container
        data-testid={'about'}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          paddingX: '5px',
          paddingY: {
            xs: '10px',
            md: '30px',
          },
          width: '98%',
          margin: {
            xs: '30px auto',
            md: '60px auto',
          },
        }}
        component="main"
      >
        <Typography
          component="h1"
          sx={{
            width: '100%',
            fontSize: '26px',
            fontWeight: 'bold',
            color: '#3A7609',
            textAlign: 'center',
          }}
        >
          {aboutConstants.common.title}
        </Typography>
        <Box
          component="div"
          sx={{
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          {members.map((item, index) => {
            return <TeamMemberCard key={index} teamMember={item} />;
          })}
        </Box>
        <Box
          component="div"
          sx={{
            width: '100%',
            display: 'flex',
            gap: '10px',
            flexDirection: {
              xs: 'column',
              md: 'row',
            },
          }}
        >
          <Box
            component="div"
            sx={{
              flexBasis: '70%',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
            }}
          >
            <Typography
              component="h2"
              sx={{
                width: '100%',
                fontSize: '22px',
                fontWeight: 'bold',
                color: '#3A7609',
                textAlign: 'center',
              }}
            >
              {aboutConstants.collaboration.title}
            </Typography>
            <Typography
              component="p"
              sx={{
                textIndent: '20px',
              }}
            >
              {aboutConstants.collaboration.p1}
            </Typography>
            <Typography
              component="p"
              sx={{
                textIndent: '20px',
              }}
            >
              {aboutConstants.collaboration.p2}
            </Typography>
          </Box>
          <Box
            component="div"
            sx={{
              flexBasis: '30%',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Paper
              elevation={3}
              sx={{
                overflow: 'hidden',
                backgroundColor: 'transparent',
                alignSelf: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                transition: 'background-color 0.3s ease-in-out',
                boxShadow: 'none',
                cursor: 'pointer',
                width: `300px`,
                minWidth: `300px`,
                padding: 1,
                borderRadius: '30px',
                '&:hover': { backgroundColor: '#323d2d' },
              }}
            >
              <Link href="https://rs.school/">
                <Box
                  component="img"
                  sx={{
                    objectFit: 'contain',
                    width: `${300 - 16}px`,
                    height: `${300 - 16}px`,
                  }}
                  src={Logo}
                  alt="RS School logo"
                />
              </Link>
            </Paper>

            <Typography
              sx={{
                p: 1,
              }}
              component="h2"
            >
              {aboutConstants.common.subtitle}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default About;
