import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store'
import { initialState } from '../components/todoList/todoReducer'
import TodoItem from '../components/todoList/todoItem/todoItem';

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;

console.error = message => {
  throw new Error(message);
};

describe('<TodoItem />', () => {
  let task;

  const initialProps = {
    name: 'read book',
    isActive: true,
    id: 0,
    history: [{
      changedAt: "2017-10-19T12:39:10.863Z",
      prop: "name",
      from: "",
      to: "read book"
    }],
  };

  beforeEach(() => {
    task = {...initialProps}
  });

  it('renders <TodoItem /> component', () => {
    const wrapper = shallow(<TodoItem task={task}/>);
    expect(wrapper.find('.todoList__item')).toHaveLength(1);
  });

  // it('renders an `.todoList__item`', () => {
  //   const wrapper = shallow(<TodoItem />);
  //   expect(wrapper.find('.todoList__item')).to.have.length(1);
  // });
  //
  // it('renders children when passed in', () => {
  //   const wrapper = shallow((
  //     <TodoItem>
  //       <div className="some__child" />
  //     </TodoItem>
  //   ));
  //   expect(wrapper.contains(<div className="some__child" />)).to.equal(true);
  // });
  //
  // it('simulates toggle todoItem status', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<TodoItem />);
  //   wrapper.find('.nameContainer__status').simulate('click');
  //   expect(onButtonClick).to.have.property('callCount', 1);
  // });
});
