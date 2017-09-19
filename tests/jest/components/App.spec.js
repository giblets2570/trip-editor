import React from 'react';
import renderer from 'react-test-renderer';
import App from '../../../src/components/App';
import { Provider } from 'react-redux'

describe('App (Snapshot)', () => {
  it('App renders', () => {
    const wrapper = shallow(
        <App store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('logged_in')).toEqual(false);
    expect(wrapper.prop('error')).toEqual(null);
  });
});