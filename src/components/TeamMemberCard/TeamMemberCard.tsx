import { Box, Link, Typography } from '@mui/material';
import { TeamMember } from '@/types';

interface TeamMemberCardProps {
  teamMember: TeamMember;
}

function TeamMemberCard({ teamMember }: TeamMemberCardProps) {
  return (
    <>
      <Box
        component="div"
        sx={{
          outline: '1px solid red',
          minWidth: '300px',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          p: 1,
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
          }}
        >
          <Box
            sx={{
              width: `200px`,
              height: `200px`,
              borderRadius: '50%',
            }}
          >
            <Box
              component="img"
              sx={{
                objectFit: 'contain',
                width: `100%`,
                height: `100%`,
              }}
              src={teamMember.photo}
              alt="Photo"
            ></Box>
          </Box>
          <Typography component="h3">{teamMember.role}</Typography>
          <Typography component="h5">{teamMember.bio}</Typography>
        </Box>
        <Box component="footer">
          <Typography component="h3">Contributions</Typography>
          <Box component="div">
            {teamMember.contributions.map((item, index) => (
              <Box key={index}> ✅ {item}</Box>
            ))}
          </Box>
        </Box>
      </Box>
    </>
  );
}

export default TeamMemberCard;
