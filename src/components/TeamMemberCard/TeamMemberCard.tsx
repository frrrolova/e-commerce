import { Box, Link, Paper, Typography } from '@mui/material';
import { TeamMember } from '@/types';
import '@/styles/styles.scss';
import styles from './TeamMember.module.scss';
import theme from '@/themes/theme';

interface TeamMemberCardProps {
  teamMember: TeamMember;
}

function TeamMemberCard({ teamMember }: TeamMemberCardProps) {
  return (
    <>
      <Box className={styles.container}>
        <Paper
          className={styles.card}
          elevation={3}
          sx={{
            backgroundColor: 'transparent',
          }}
        >
          <Box
            className={styles.inner}
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              padding: '20px',
            }}
          >
            <Box
              component="header"
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                borderBottom: '1px solid gray',
                p: 1,
              }}
            >
              <Typography color={theme.palette.primary.contrastText} component="h2">
                {teamMember.name}
              </Typography>
              <Link
                sx={{
                  position: 'relative',
                  zIndex: '10',
                }}
                href={teamMember.git}
              >
                Github
              </Link>
            </Box>
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                p: 1,
              }}
            >
              <Box
                className={styles.img}
                sx={{
                  borderRadius: '40px',
                  backgroundImage: `url('${teamMember.photo}')`,
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: 'cover',
                  backgroundPosition: 'top center',
                  overflow: 'hidden',
                }}
              ></Box>
              <Typography
                color={theme.palette.primary.contrastText}
                sx={{
                  fontStyle: 'italic',
                  textAlign: 'center',
                  p: 1,
                }}
                component="p"
              >
                {teamMember.role}
              </Typography>
              <Typography
                color={theme.palette.primary.contrastText}
                component="h4"
                sx={{
                  alignSelf: 'flex-start',
                  fontSize: '18px',
                  marginY: '10px',
                  fontWeight: 'bold',
                }}
              >
                Bio
              </Typography>
              <Typography className={styles.bio} color={theme.palette.primary.contrastText} component="h5">
                {teamMember.bio}
              </Typography>
            </Box>
            <Box component="footer">
              <Typography
                color={theme.palette.primary.contrastText}
                component="h3"
                sx={{
                  alignSelf: 'flex-start',
                  fontSize: '18px',
                  marginY: '10px',
                  fontWeight: 'bold',
                }}
              >
                Contributions
              </Typography>
              <Box component="div">
                {teamMember.contributions.map((item, index) => (
                  <Box
                    color={theme.palette.primary.contrastText}
                    sx={{
                      fontSize: '14px',
                      p: 1,
                      borderBottom: '1px solid gray',
                      '&:last-child': { borderBottom: 'none' },
                    }}
                    key={index}
                  >
                    ✅ {item}
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>
        </Paper>
      </Box>
    </>
  );
}

export default TeamMemberCard;
