import React from 'react';
import Enzyme, { shallow, render, mount } from 'enzyme';
import sinon from 'sinon';
import renderer from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from '../components/todoList/todoItem/todoItem';

Enzyme.configure({ adapter: new Adapter() });

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

  it('should match its snapshot', () => {
    const tree = renderer.create(<TodoItem task={task}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a `.todoList__item`', () => {
    const wrapper = shallow(<TodoItem task={task}/>);
    expect(wrapper.find('.todoList__item')).toHaveLength(1);
  });

  it('changes state on editing task name', () => {
    const wrapper = mount(<TodoItem task={task}/>);
    wrapper.find('.item__editTask').simulate('click');
    const inp = wrapper.find('.item__editInput');
    inp.simulate('keypress', {key: 's'});
    expect(wrapper.state('editedName')).toBe('read books');
  });

  // it('simulates open modal on todoItem remove', () => {
  //   const onButtonClick = sinon.spy();
  //   const wrapper = shallow(<TodoItem task={task}/>);
  //   wrapper.find('.item__removeTask').simulate('click');
  //   expect(wrapper.find('.modal__header')).toHaveLength(1);
  // });
});
