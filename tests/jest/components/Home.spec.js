import React from 'react';
import renderer from 'react-test-renderer';
import Home from '../../../src/components/Home';
import store from '../../../src/store'
import { Provider } from 'react-redux'

describe('Home (Snapshot)', () => {
  it('Home renders', () => {
    let wrapper = shallow(
    	<Home store={mockStore} />
    );

    expect(wrapper.prop('login_screen')).toEqual(true);
    expect(wrapper.prop('error')).toEqual(null);
    expect(wrapper).toMatchSnapshot();
  });
});