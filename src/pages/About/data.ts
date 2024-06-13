import { TeamMember } from '@/types';
import Placeholder from '/images/catalog/placeholder_plant.png';
import Yar from '/images/Yar.webp';
import frrrolova from '/images/frrrolova.webp';

export const members: TeamMember[] = [
  {
    role: 'Front-end developer',
    name: 'Tetiana Kostromitska',
    bio: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debitis, Lorem ipsum dolor sit amet consectetur adipisicing elit. Fugit recusandae, suscipit sunt ad debit',
    photo: Placeholder,
    git: 'https://github.com/tanykos',
    contributions: [
      'CommerceTools Project Setup',
      'Task Board Setup (Trello)',
      'Main Page Implementation',
      'Header Implementation',
      'Catalog Page Implementation',
      'Header Implementation',
    ],
  },
  {
    role: 'Front-end developer',
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
