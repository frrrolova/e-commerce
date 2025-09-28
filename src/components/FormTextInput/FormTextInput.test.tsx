/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
import { renderWithProviders } from '@/utils/test-utils';
import FormTextInput, { FormTextInputProps } from './FormTextInput';
import { screen } from '@testing-library/react';

/* eslint-disable @typescript-eslint/no-explicit-any */
jest.mock('@client/client', () => {
  return null;
});

type SimpleFnMock = jest.Mock<any, any, any>;

let onChangeMock: SimpleFnMock;
let onBlurMock: SimpleFnMock;

function renderComponent(componentProps?: Partial<FormTextInputProps>) {
  return renderWithProviders(
    <FormTextInput
      onChange={onChangeMock}
      onBlur={onBlurMock}
      name=""
      value=""
      label=""
      placeholder=""
      error={false}
      errorMsg=""
      disabled={false}
      {...componentProps}
    />,
  );
}

describe('FormTextInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onChangeMock = jest.fn();
    onBlurMock = jest.fn();
  });

  test('label is in document', async () => {
    renderComponent({ name: 'input', label: 'test-label' });

    const inputLabel = await screen.findByLabelText('test-label');
    expect(inputLabel).toBeInTheDocument();
  });

  test('error text is correct', () => {
    const { getByTestId } = renderComponent({ error: true, errorMsg: 'test error message' });
    const helperTextEl = getByTestId('test-error-text');
    expect(helperTextEl.textContent).toBe('test error message');
  });

  test('becomes disabled', () => {
    const { getByTestId } = renderComponent({ name: 'test', disabled: true });
    expect(getByTestId('test-input').querySelector('input')!!).toBeDisabled();
  });
});
