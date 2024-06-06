import { Box, Container, Typography, Link, Paper } from '@mui/material';
import Logo from '/images/RSLOGO.png';
import TeamMemberCard from '@/components/TeamMemberCard/TeamMemberCard';
import Placeholder from '/images/catalog/placeholder_plant.png';

const member = {
  role: 'Front-end developer',
  name: 'Ivan Ivanow',
  bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debitis, Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debit',
  photo: Placeholder,
  git: 'https://github.com/REGEMLER',
  contributions: [
    'Well done',
    'Lorem ipsum dolor sit',
    'Lorem ipsum dolor sit',
    'Lorem ipsum dolor sit amet consectetur adipisicing',
  ],
};

function About() {
  return (
    <>
      <Container
        sx={{
          outline: '1px solid red',
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          paddingX: '5px',
          paddingY: {
            xs: '10px',
            md: '30px',
          },
          width: {
            xs: '95%',
            md: '85%',
          },
          margin: {
            xs: '20px auto',
            md: '60px auto',
          },
        }}
        component="main"
      >
        <Box
          component="div"
          sx={{
            outline: '1px solid green',
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
              component="h1"
              sx={{
                width: '100%',
                fontSize: '26px',
                fontWeight: 'bold',
                color: '#3A7609',
                textAlign: 'center',
              }}
            >
              Our team
            </Typography>
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
              Collaboration
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debitis, amet
              rem accusantium tempore, a consequuntur est animi delectus laborum repellendus distinctio beatae labore!
              Enim, nemo?
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debitis, amet
              rem accusantium tempore, a consequuntur est animi delectus laborum repellendus distinctio beatae labore!
              Enim, nemo?
            </Typography>
            <Typography component="p">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debitis, amet
              rem accusantium tempore, a consequuntur est animi delectus laborum repellendus distinctio beatae labore!
              Enim, nemo?
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
              Made with love in 2024
            </Typography>
          </Box>
        </Box>
        <Box
          component="div"
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            outline: '1px solid yellow',
          }}
        >
          <TeamMemberCard teamMember={member} />
          <TeamMemberCard teamMember={member} />
          <TeamMemberCard teamMember={member} />
        </Box>
      </Container>
    </>
  );
}

export default About;
