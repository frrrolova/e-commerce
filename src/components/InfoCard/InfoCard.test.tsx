import { renderWithProviders } from '@/utils/test-utils';
import InfoCard from './InfoCard';
import { InfoCardProps } from './types';
import { fireEvent, screen } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});

const navigateMock = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => navigateMock,
}));

function renderComponent(componentProps?: Partial<InfoCardProps>) {
  return renderWithProviders(
    <InfoCard
      data={{ id: 'card-id-1', heading: 'heading', subHeading: '', imgPath: '', description: '' }}
      button={{ label: '', url: '' }}
      {...componentProps}
    />,
  );
}

describe('InfoCard', () => {
  test('Data in document is correct', () => {
    renderComponent({
      data: { id: 'card-id-1', heading: 'test heading', subHeading: '', imgPath: '', description: '' },
    });

    const heading = screen.getByText('test heading');

    expect(heading).toBeInTheDocument();
  });

  test('navigate when btn click', async () => {
    renderComponent({
      button: { label: 'click-me', url: 'url' },
    });
    const btn = screen.getByText('click-me');

    await fireEvent.click(btn);

    expect(navigateMock).toHaveBeenCalled();
  });
});
