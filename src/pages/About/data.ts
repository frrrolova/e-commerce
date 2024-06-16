import { TeamMember } from '@/types';
import tanykos from '/images/tanykos.webp';
import yar from '/images/Yar.webp';
import frrrolova from '/images/tatiana.webp';

export const members: TeamMember[] = [
  {
    role: 'Front-end developer',
    name: 'Tetiana Kostomitska',
    bio: `Graduated from Taurida National University with a degree in Mathematics. 
          Possesses 5 years of experience as a html-developer with expertise in web 
          development and responsive design. I enjoy learning new things and applying 
          knowledge in practice. I am happy to observe my progress in web-development.`,
    photo: tanykos,
    git: 'https://github.com/tanykos',
    contributions: [
      'CommerceTools Project Setup',
      'Trello Board Setup',
      'Main Page Implementation',
      'Header Implementation',
      'Catalog Page',
      'Routing Implementation',
      'Pagination',
    ],
  },
  {
    role: 'Team leader',
    name: 'Tatiana Frolova',
    bio: ` Graduated from St. Petersburg State Pediatric Medical University. Started learning frontend in 2022. Now live in Novi Sad, Serbia.
           In love with the process of creating interfaces, when you can visually observe the results of your work, I love the feeling of a working brain while solving a difficult task.`,
    photo: frrrolova,
    git: 'https://github.com/frrrolova',
    contributions: [
      'Environment Configuration',
      'Repository Setup',
      'Registration Page',
      'Routing Implementation',
      'User Profile Page',
      'Basket Implementation',
    ],
  },
  {
    role: 'Front-end developer',
    name: 'Yaroslaw Rychik',
    bio: 'My name is Yaroslaw. I am from Gomel. I have graduated from technical State University in 2019. Firstly I have worked as a design engineer but I made a decision to change my profession. So I went to an IT course at RS School. I hope one day I shall become a professional front-end developer.',
    photo: yar,
    git: 'https://github.com/REGEMLER',
    contributions: ['Development README', 'Login Page', 'Product Page', 'About Us Page'],
  },
];
