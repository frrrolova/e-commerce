import { Box, Container, Typography, Link, Paper } from '@mui/material';
import Logo from '/images/rs-logo.svg';
import TeamMemberCard from '@/components/TeamMemberCard/TeamMemberCard';
import { members } from './data';
import { aboutConstants } from './constants';
import theme from '@/themes/theme';
import styles from './About.module.scss';
import Title from '@/components/Title/Title';

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
            xs: '64px',
            md: '90px',
          },
          width: '98%',
          margin: {
            xs: '0 auto',
            md: '0 auto',
          },
        }}
        component="main"
      >
        <Box className={styles.mainTitle}>
          <Title title={aboutConstants.common.title} />
        </Box>

        <Box
          className={styles.outer}
          component="div"
          sx={{
            width: '100%',
            margin: '0 auto',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: '20px',
          }}
        >
          {members.map((item, index) => {
            return <TeamMemberCard key={index} teamMember={item} />;
          })}
        </Box>
        <Box
          component="div"
          className={styles.inner}
          sx={{
            width: '100%',
            display: 'flex',
            gap: '10px',
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
              color={theme.palette.primary.contrastText}
              component="p"
              sx={{
                textIndent: '20px',
              }}
            >
              {aboutConstants.collaboration.p1}
            </Typography>
            <Typography
              color={theme.palette.primary.contrastText}
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
              className={styles.logobox}
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
                padding: 1,
                borderRadius: '30px',
                '&:hover': { backgroundColor: '#323d2d' },
              }}
            >
              <Link href="https://rs.school/">
                <Box
                  component="img"
                  className={styles.logo}
                  sx={{
                    objectFit: 'contain',
                  }}
                  src={Logo}
                  alt="RS School logo"
                />
              </Link>
            </Paper>

            <Typography
              color={theme.palette.primary.contrastText}
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
