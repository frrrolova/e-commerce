import { Box, Link, Paper, Typography } from '@mui/material';
import { TeamMember } from '@/types';

interface TeamMemberCardProps {
  teamMember: TeamMember;
}

function TeamMemberCard({ teamMember }: TeamMemberCardProps) {
  return (
    <>
      <Paper
        elevation={3}
        sx={{
          backgroundColor: 'transparent',
        }}
      >
        <Box
          component="div"
          sx={{
            minWidth: {
              xs: '300px',
              md: '200px',
              lg: '300px',
            },
            display: 'flex',
            flexDirection: 'column',
            gap: '10px',
            padding: '10px',
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
            <Typography component="h2">{teamMember.name}</Typography>
            <Link href={teamMember.git}>Github</Link>
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
              sx={{
                width: `200px`,
                height: `200px`,
                borderRadius: '50%',
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                sx={{
                  objectFit: 'cover',
                  width: `100%`,
                  height: `100%`,
                }}
                src={teamMember.photo}
                alt="Photo"
              ></Box>
            </Box>
            <Typography
              sx={{
                fontStyle: 'italic',
                textAlign: 'center',
              }}
              component="p"
            >
              {teamMember.role}
            </Typography>
            <Typography
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
            <Typography component="h5">{teamMember.bio}</Typography>
          </Box>
          <Box component="footer">
            <Typography
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
                  sx={{
                    p: 1,
                    borderBottom: '1px solid gray',
                  }}
                  key={index}
                >
                  {' '}
                  ✅ {item}
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      </Paper>
    </>
  );
}

export default TeamMemberCard;
