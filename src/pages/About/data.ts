import { TeamMember } from '@/types';
import tanykos from '/images/tanykos.webp';
import Yar from '/images/yar.webp';
import frrrolova from '/images/frrrolova.webp';

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
      'Task Board Setup (Trello)',
      'Main Page Implementation',
      'Header Implementation',
      'Catalog Page',
      'Routing Implementation',
    ],
  },
  {
    role: 'Team leader',
    name: 'Tatiana Frolova',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debitis, Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debit',
    photo: frrrolova,
    git: 'https://github.com/frrrolova',
    contributions: [
      'Development Scripts',
      'Environment Configuration',
      'Repository Setup',
      'Registration Page',
      'Routing Implementation',
      'User Profile Page',
      'Basket',
    ],
  },
  {
    role: 'Front-end developer',
    name: 'Yaroslaw Rychik',
    bio: 'My name is Yaroslaw. I am from Gomel. I have graduated from technical State University in 2019. Firstly I have worked as a design engineer but I made a decision to change my profession. So I went to an IT course at RS School.',
    photo: Yar,
    git: 'https://github.com/REGEMLER',
    contributions: ['Development README', 'Login Page', 'Product Page', 'About Us Page'],
  },
];
