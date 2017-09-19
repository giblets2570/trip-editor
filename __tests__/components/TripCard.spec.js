import React from 'react';
import renderer from 'react-test-renderer';
import TripCard from '../../src/components/TripCard';
import store from '../../src/store'
import { Provider } from 'react-redux'

describe('TripCard (Snapshot)', () => {
  it('TripCard renders', () => {
    const trip = {
      startDate: new Date('9/18/17'),
      endDate: new Date('9/18/17'),
      destination: "France",
      comments: "Great"
    }
    let wrapper = shallow(
      <TripCard trip={trip} store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('trip')).toEqual(trip);
  });
});