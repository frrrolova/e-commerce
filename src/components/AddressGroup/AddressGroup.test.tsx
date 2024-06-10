/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { muiSelectValue, renderWithProviders } from '@/utils/test-utils';
import AddressGroup, { AddressGroupProps } from './AddressGroup';
import { AddressTypes } from '@/enums/auth-form.enum';
import { fireEvent } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});

type SimpleFnMock = jest.Mock<any, any, any>;

let onFieldChangeMock: SimpleFnMock;
let handleChangeMock: SimpleFnMock;
let handleBlurMock: SimpleFnMock;
let setFieldTouchedMock: SimpleFnMock;
let validateFieldMock: SimpleFnMock;

function renderComponent(componentProps?: Partial<AddressGroupProps>) {
  return renderWithProviders(
    <AddressGroup
      prefix={'' as unknown as AddressTypes}
      onFieldChange={onFieldChangeMock}
      handleChange={handleChangeMock}
      handleBlur={handleBlurMock}
      setFieldTouched={setFieldTouchedMock}
      validateField={validateFieldMock}
      touched={{}}
      errors={{}}
      values={{ country: '' }}
      countryCodes={[]}
      {...componentProps}
    />,
  );
}

describe('AddressGroup', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onFieldChangeMock = jest.fn();
    handleChangeMock = jest.fn();
    handleBlurMock = jest.fn();
    setFieldTouchedMock = jest.fn().mockResolvedValue('');
    validateFieldMock = jest.fn();
  });

  test('prefix should be set as inputs name-prefix', async () => {
    const { getByTestId } = renderComponent({ prefix: 'test' as unknown as AddressTypes });

    expect(getByTestId('test.country')).toBeDefined();
    expect(getByTestId('test.city-input')).toBeDefined();
    expect(getByTestId('test.streetName-input')).toBeDefined();
    expect(getByTestId('test.building-input')).toBeDefined();
    expect(getByTestId('test.apartment-input')).toBeDefined();
    expect(getByTestId('test.postalCode-input')).toBeDefined();
  });

  test('handle change is called when user types', async () => {
    const { getByTestId } = renderComponent({ countryCodes: ['AT'] });

    await fireEvent.change(getByTestId('country').querySelector('input')!!, { target: { value: 'AT' } });
    await fireEvent.change(getByTestId('city-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('streetName-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('postalCode-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('building-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('apartment-input').querySelector('input')!!, { target: { value: 'test' } });

    expect(handleChangeMock).toHaveBeenCalledTimes(6);
    expect(onFieldChangeMock).toHaveBeenCalledTimes(6);
  });

  test('set touched and validate when value changes', async () => {
    const { getByTestId } = renderComponent({ countryCodes: ['AT'] });

    await muiSelectValue('country', 'menuItem.AT');

    await fireEvent.change(getByTestId('city-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('streetName-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('postalCode-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('building-input').querySelector('input')!!, { target: { value: 'test' } });
    await fireEvent.change(getByTestId('apartment-input').querySelector('input')!!, { target: { value: 'test' } });

    expect(setFieldTouchedMock).toHaveBeenCalledTimes(6);
    expect(validateFieldMock).toHaveBeenCalledTimes(6);
  });
});
