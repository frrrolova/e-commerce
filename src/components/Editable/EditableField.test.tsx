/* eslint-disable @typescript-eslint/no-explicit-any */
import { renderWithProviders } from '@/utils/test-utils';
import EditableField, { EditableFieldProps } from './EditableField';
import { fireEvent } from '@testing-library/react';

jest.mock('@client/client', () => {
  return null;
});

type SimpleFnMock = jest.Mock<any, any, any>;

let onSaveMock: SimpleFnMock;
let onEditClickMock: SimpleFnMock;
let onCancelClickMock: SimpleFnMock;

function renderComponent(componentProps?: Partial<EditableFieldProps>) {
  return renderWithProviders(
    <EditableField
      placeholder=""
      label=""
      onSaveClick={onSaveMock}
      onCancelClick={onCancelClickMock}
      onEditClick={onEditClickMock}
      isSaveDisabled={false}
      children={<div></div>}
      {...componentProps}
    />,
  );
}

describe('EditableField', () => {
  beforeEach(() => {
    jest.clearAllMocks();

    onSaveMock = jest.fn();
    onCancelClickMock = jest.fn();
    onEditClickMock = jest.fn();
  });

  test('has edit mode triggering', async () => {
    const { getByTestId } = renderComponent();
    const editBtn = getByTestId('edit-btn');

    await fireEvent.click(editBtn);

    expect(onEditClickMock).toHaveBeenCalled();
  });

  test('has edit mode buttons in document', async () => {
    const { getByTestId } = renderComponent();
    const editBtn = getByTestId('edit-btn');

    await fireEvent.click(editBtn);

    expect(getByTestId('edit-mode-btns')).toBeInTheDocument();
  });

  test('save btn set disabled', async () => {
    const { getByTestId } = renderComponent({ isSaveDisabled: true });
    const editBtn = getByTestId('edit-btn');
    await fireEvent.click(editBtn);

    const saveBtn = getByTestId('edit-save');
    expect(saveBtn).toBeDisabled();
  });

  test('edit btn hides', async () => {
    const { getByTestId } = renderComponent({ isSaveDisabled: true });
    const editBtn = getByTestId('edit-btn');
    await fireEvent.click(editBtn);

    expect(editBtn).not.toBeInTheDocument();
  });

  test('edit btn is shown after edit mode closing', async () => {
    const { getByTestId } = renderComponent();
    const editBtn = getByTestId('edit-btn');
    await fireEvent.click(editBtn);

    const cancelBtn = getByTestId('edit-cancel');
    await fireEvent.click(cancelBtn);

    expect(getByTestId('edit-btn')).toBeInTheDocument();
  });

  test('onCancelClick triggering', async () => {
    const { getByTestId } = renderComponent();
    const editBtn = getByTestId('edit-btn');
    await fireEvent.click(editBtn);

    const cancelBtn = getByTestId('edit-cancel');
    await fireEvent.click(cancelBtn);

    expect(onCancelClickMock).toHaveBeenCalled();
  });
});
