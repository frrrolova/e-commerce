import { renderWithProviders } from '@/utils/test-utils';
import { screen } from '@testing-library/react';
import TeamMemberCard from './TeamMemberCard';
import Placeholder from '/images/catalog/placeholder_plant.png';

jest.mock('@client/client', () => {
  return null;
});

const member = {
  role: 'Developer',
  name: 'Vasya',
  bio: 'Lorem ipsum dolor sit amet',
  photo: Placeholder,
  git: '',
  contributions: ['CommerceTools Project Setup'],
};

describe('Team Member Card', () => {
  test('Data in document is correct', async () => {
    renderWithProviders(<TeamMemberCard teamMember={member} />);
    const name = screen.getByText('Vasya');
    expect(name).toBeInTheDocument();
  });

  test('Data in document is correct', async () => {
    renderWithProviders(<TeamMemberCard teamMember={member} />);
    const role = screen.getByText('Developer');
    expect(role).toBeInTheDocument();
  });
});
