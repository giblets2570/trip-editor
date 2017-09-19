import React from 'react';
import renderer from 'react-test-renderer';
import PrintPage from '../../src/components/PrintPage';
import store from '../../src/store'
import { Provider } from 'react-redux'

describe('PrintPage (Snapshot)', () => {
  it('PrintPage renders', () => {
    let wrapper = shallow(
		<PrintPage store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('trips')).toEqual([]);
  });
});