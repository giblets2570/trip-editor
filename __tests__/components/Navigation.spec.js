import React from 'react';
import renderer from 'react-test-renderer';
import Navigation from '../../src/components/Navigation';
import store from '../../src/store'
import { Provider } from 'react-redux'

describe('Navigation (Snapshot)', () => {
  it('Navigation renders', () => {
  	const match = {
  		params: {
  			id: '1234'
  		}
  	}
    let wrapper = shallow(
		<Navigation match={match} store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('match')).toEqual(match)
    expect(wrapper.prop('user')).toEqual({role: null})
    expect(wrapper.prop('trips')).toEqual([])
    expect(wrapper.prop('printTrips')).toEqual([])
  });
});