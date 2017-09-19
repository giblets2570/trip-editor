import React from 'react'
import renderer from 'react-test-renderer'
import CreateTrip from '../../src/components/CreateTrip'
import store from '../../src/store'
import { Provider } from 'react-redux'

describe('CreateTrip (Snapshot)', () => {
  it('CreateTrip renders', () => {
  	let wrapper = shallow(
      <CreateTrip store={mockStore}/>
    );
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.prop('trip')).toEqual(undefined);

    const trip = {
      startDate: new Date('9/18/17'),
      endDate: new Date('9/18/17'),
      destination: "France",
      comments: "Great"
    }
    
    wrapper = shallow(
      <CreateTrip store={mockStore} trip={trip}/>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('trip')).toEqual(trip);


  })
})