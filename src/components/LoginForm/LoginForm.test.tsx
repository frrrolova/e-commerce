import { renderWithProviders } from '@/utils/test-utils';
import LoginForm from './LoginForm';
import { fireEvent, screen, waitFor } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});

describe('LoginForm', () => {
  test('Input mail has a value', async () => {
    await renderWithProviders(<LoginForm />);
    const inputMail = screen.getByPlaceholderText('Email');
    await fireEvent.input(inputMail, {
      target: { value: '1' },
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Email')).toHaveValue('1');
    });
  });
  test('Input password has a value', async () => {
    await renderWithProviders(<LoginForm />);
    const inputMail = screen.getByPlaceholderText('Password');
    await fireEvent.input(inputMail, {
      target: { value: '1' },
    });
    await waitFor(() => {
      expect(screen.getByPlaceholderText('Password')).toHaveValue('1');
    });
  });
  test('submit button should not be disabled', async () => {
    renderWithProviders(<LoginForm />);
    await fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'anorret@gmail.com' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'AaaGthr45aaaaa11' } });

    await waitFor(() => {
      expect(screen.getByTestId('login-btn')).not.toBeDisabled();
    });
  });
  test('button disabled with invalid email', async () => {
    renderWithProviders(<LoginForm />);

    await fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'test' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'FRgdfhgsdfhfh234' } });

    await waitFor(() => {
      expect(screen.getByTestId('login-btn')).toBeDisabled();
    });
  });
  test('button disabled with invalid password', async () => {
    renderWithProviders(<LoginForm />);
    await fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'anoret@gmail.com' } });
    await fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'test' } });

    await waitFor(() => {
      expect(screen.getByTestId('login-btn')).toBeDisabled();
    });
  });
});
