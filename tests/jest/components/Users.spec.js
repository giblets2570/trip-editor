import React from 'react';
import renderer from 'react-test-renderer';
import Users from '../../../src/components/Users';
import store from '../../../src/store'
import { Provider } from 'react-redux'

describe('Users (Snapshot)', () => {
  it('Users renders', () => {
    let wrapper = shallow(
		<Users store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('users')).toEqual([]);
  });
});