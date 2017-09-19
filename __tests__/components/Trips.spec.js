import React from 'react';
import renderer from 'react-test-renderer';
import Trips from '../../src/components/Trips';
import store from '../../src/store'
import { Provider } from 'react-redux'

describe('Trips (Snapshot)', () => {
  it('Trips renders', () => {
  	const match = {
  		params: {
  			id: '1234'
  		}
  	}
    let wrapper = shallow(
      <Trips match={match} store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('trips')).toEqual([]);
    expect(wrapper.prop('filters').destination).toEqual("");
    expect(wrapper.prop('filters').startDate).toEqual(null);
    expect(wrapper.prop('filters').endDate).toEqual(null);
  });
});