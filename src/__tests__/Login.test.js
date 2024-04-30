import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import configureMockStore from 'redux-mock-store';
import { MemoryRouter } from 'react-router-dom';
import Login from '../Pages/Auth/Login';

const mockStore = configureMockStore();

describe('Login component', () => {
  let store;
  let wrapper;

  beforeEach(() => {
    store = mockStore({
      auth: {
        isAuth: null,
        users: [
          { email: 'test@example.com', password: 'password123' },
          { email: 'user@example.com', password: 'testpassword' },
        ],
      },
    });

    wrapper = mount(
      <Provider store={store}>
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </Provider>
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('renders without crashing', () => {
    expect(wrapper.exists()).toBe(true);
  });

  it('displays login form', () => {
    // const wrapper = shallow(<Login />);
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('handles form submission', () => {
    const form = wrapper.find('form');
    const preventDefault = jest.fn();
    form.simulate('submit', { preventDefault });
    expect(preventDefault).toHaveBeenCalled();
  });
});
