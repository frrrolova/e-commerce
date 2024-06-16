import { renderWithProviders } from '@/utils/test-utils';
import RemoveBtn from './RemoveBtn';
import { fireEvent, screen } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});
const mockCallback = jest.fn(function () {
  console.log('Clicked');
});

describe('RemoveBtn', () => {
  test('Call back is called', async () => {
    renderWithProviders(<RemoveBtn onClick={mockCallback} />);
    const btn = screen.getByRole('button');
    await fireEvent.click(btn);
    expect(mockCallback).toHaveBeenCalled();
  });
});
