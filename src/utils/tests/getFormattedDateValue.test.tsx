import { getFormattedDateValue } from '../getFormattedDateValue';

describe('getFormattedDateValue', () => {
  test('formatting correctly', () => {
    const returnedDateStr = getFormattedDateValue('2024-05-29T16:59:29.016Z');
    expect(returnedDateStr).toStrictEqual('2024-05-29');
  });
});
