/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { renderWithProviders } from '@/utils/test-utils';
import AddressModalForm, { AddressFormProps } from './AddressModalForm';
import { AddressTypes } from '@/enums/auth-form.enum';
import { act, fireEvent, screen, waitFor } from '@testing-library/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('@client/client', () => {
  return null;
});

type SimpleFnMock = jest.Mock<any, any, any>;

let onSubmitMock: SimpleFnMock;
let onCloseMock: SimpleFnMock;

function renderComponent(componentProps?: Partial<AddressFormProps>) {
  return renderWithProviders(
    <AddressModalForm
      open={true}
      address={{ country: 'AT' }}
      type={AddressTypes.SHIPPING}
      onSubmit={onSubmitMock}
      onClose={onCloseMock}
      {...componentProps}
    />,
  );
}

describe('AddressModalForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onSubmitMock = jest.fn();
    onCloseMock = jest.fn();
  });

  test('submit valid form', async () => {
    const { getByTestId } = renderComponent({
      address: { country: 'DE', city: 'test', streetName: 'test', postalCode: '12345' },
    });
    const submitButton = screen.getByText('Save');

    await fireEvent.change(getByTestId('building-input').querySelector('input')!!, { target: { value: 'test' } });

    act(() => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(onSubmitMock).toHaveBeenCalled();
    });
  });

  test('disable to submit invalid form', async () => {
    const { getByTestId } = renderComponent({
      address: { country: 'DE', city: 'test', streetName: 'test', postalCode: '12345' },
    });
    const submitButton = screen.getByText('Save');

    await fireEvent.change(getByTestId('city-input').querySelector('input')!!, { target: { value: '123' } });

    await waitFor(() => {
      expect(submitButton).toBeDisabled();
    });
  });

  test('address modal closing', async () => {
    renderComponent();

    const closeBtn = screen.getByText('Cancel');

    await fireEvent.click(closeBtn);

    await waitFor(() => {
      expect(onCloseMock).toHaveBeenCalled();
    });
  });
});
