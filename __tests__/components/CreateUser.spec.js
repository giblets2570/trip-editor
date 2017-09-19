import React from 'react';
import renderer from 'react-test-renderer';
import CreateUser from '../../src/components/CreateUser';
import store from '../../src/store'
import { Provider } from 'react-redux'

describe('CreateUser (Snapshot)', () => {
  it('CreateUser renders', () => {
    let wrapper = shallow(
      <CreateUser store={mockStore}/>
    );
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.prop('user')).toEqual(undefined);

    const user = {
        name: "Tom",
        role: "user",
        email: "tom@tom.com"
    }
    
    wrapper = shallow(
      <CreateUser store={mockStore} user={user}/>
    );
    expect(wrapper).toMatchSnapshot();
    expect(wrapper.prop('user')).toEqual(user);


  });
});