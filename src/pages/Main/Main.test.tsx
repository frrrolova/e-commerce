// import { fireEvent, render, waitFor } from '@testing-library/react';
import { renderWithProviders } from '../../utils/test-utils';
import Main from './Main';
// import { ButtonLabels } from './constants';

jest.mock('../../client/client', () => {
  return null;
});

//Mock for useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

describe('Main component rendering', () => {
  test('performs snapshot testing', () => {
    const tree = renderWithProviders(<Main />);
    expect(tree).toMatchSnapshot();
  });
});

// describe('Header component behavior', () => {
//   test('should navigate, when clicking on a section title button', async () => {
//     const { getByText } = render(<Main />);

//     await waitFor(() => {
//       const loginButton = getByText(ButtonLabels.LOGIN);

//       fireEvent.click(loginButton);
//       expect(mockNavigate).toHaveBeenCalledTimes(1);
//     });
//   });
// });
