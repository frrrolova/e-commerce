/* eslint-disable @typescript-eslint/no-extra-non-null-assertion */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderWithProviders } from '@/utils/test-utils';
import EditableInput, { EditableInputProps } from '../EditableInput/EditableInput';
import * as Yup from 'yup';

jest.mock('@client/client', () => {
  return null;
});

type SimpleFnMock = jest.Mock<any, any, any>;

let onSubmitMock: SimpleFnMock;

function renderComponent(componentProps?: Partial<EditableInputProps>) {
  return renderWithProviders(
    <EditableInput
      name=""
      initialValue=""
      placeholder=""
      label=""
      schema={Yup.string()}
      onSave={onSubmitMock}
      {...componentProps}
    />,
  );
}

describe('EditableInput', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onSubmitMock = jest.fn();
  });

  test('has correct value', async () => {
    const { getByTestId } = renderComponent({ name: 'name', initialValue: 'test' });
    expect(getByTestId('name-input').querySelector('input')!!.value).toBe('test');
  });
});
