import React from 'react';
import renderer from 'react-test-renderer';
import Filter from '../../../src/components/Filter';
import store from '../../../src/store'
import { Provider } from 'react-redux'

describe('Filter (Snapshot)', () => {
  it('Filter renders', () => {
  	const match = {
  		params: {
  			id: '1234'
  		}
  	}
    let wrapper = shallow(
      <Filter match={match} store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('filters').destination).toEqual("");
    expect(wrapper.prop('filters').startDate).toEqual(null);
    expect(wrapper.prop('filters').endDate).toEqual(null);
    expect(wrapper.prop('user')).toEqual({role: null});
    expect(wrapper.prop('users')).toEqual([]);
    expect(wrapper.prop('match').params.id).toEqual('1234')
  });
});