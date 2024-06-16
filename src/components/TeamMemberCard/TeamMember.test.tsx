import { renderWithProviders } from '@/utils/test-utils';
import { screen } from '@testing-library/react';
import TeamMemberCard from './TeamMemberCard';
import Placeholder from '/images/catalog/placeholder_plant.png';
import { TeamMember } from '@/types';

jest.mock('@client/client', () => {
  return null;
});

describe('Team Member Card', () => {
  let member: TeamMember;
  beforeEach(() => {
    member = {
      role: 'Developer',
      name: 'Vasya',
      bio: 'Lorem ipsum dolor sit amet',
      photo: Placeholder,
      git: '',
      contributions: ['CommerceTools Project Setup'],
    };
  });
  test('Data in document is correct', async () => {
    const element = renderWithProviders(<TeamMemberCard teamMember={member} />);
    const name = screen.getByText('Vasya');
    expect(name).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });

  test('Data in document is correct', async () => {
    const element = renderWithProviders(<TeamMemberCard teamMember={member} />);
    const role = screen.getByText('Developer');
    expect(role).toBeInTheDocument();
    expect(element).toMatchSnapshot();
  });
});
