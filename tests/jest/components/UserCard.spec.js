import React from 'react';
import renderer from 'react-test-renderer';
import UserCard from '../../../src/components/UserCard';
import store from '../../../src/store'
import { Provider } from 'react-redux'

describe('UserCard (Snapshot)', () => {
  it('UserCard renders', () => {
    const user = {
        name: "Tom",
        role: "user",
        email: "tom@tom.com"
    }
    let wrapper = shallow(
        <UserCard user={user} store={mockStore} />
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('user')).toEqual(user);
  });
});