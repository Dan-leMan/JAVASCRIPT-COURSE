import {formatCurrency} from '../scripts/utils/money.js';

describe('test suite: formatCurrency', () => {
  it('converts cents into dollars', () => {
    expect(formatCurrency(2095)).toEqual('20.95');
  });

  it('')
});

//I need to finish this off! Either continue course or look at other tutorial for testing.