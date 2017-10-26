import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import TodoItem from '../components/todoList/todoItem/todoItem';

Enzyme.configure({ adapter: new Adapter() });

console.error = message => {
  throw new Error(message);
};

describe('<TodoItem />', () => {
  let wrapper, task;

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
    task = {...initialProps};
    wrapper = mount(<TodoItem task={task}/>);
  });

  it('should match its snapshot', () => {
    const tree = renderer.create(<TodoItem task={task}/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a `.todoList__item`', () => {
    expect(wrapper.find('.todoList__item')).toHaveLength(1);
  });

  it('should not showing todoItem history after rendering', () => {
    expect(wrapper.find('.displayNone')).toHaveLength(1);
  });

  it('should show input field to change task name', () => {
    wrapper.find('.item__editTask').simulate('click');
    expect(wrapper.find('.item__editInput')).toHaveLength(1);
  });

  // it('changes state on editing task name', () => {
  //   wrapper.find('.item__editTask').simulate('click');
  //   let inp = wrapper.find('.item__editInput');
  //   const code = 's'.charCodeAt(0);
  //   inp.simulate('keyPress', {which: 89, key: 'z', keyCode: 89}); // Received an action, but input not changing
  //   // inp.simulate('keypress', {which: 27, key: 'Enter', keyCode: 27});
  //   expect(wrapper.state('editedName')).toBe('read books');
  // });

//   it('show modal on todoItem remove request', () => {
//     wrapper.find('.item__removeTask').simulate('click');
//     expect(wrapper.find('.modal__header')).toHaveLength(1);
//   });
//   issue with React 16 Portals (modals) https://github.com/airbnb/enzyme/issues/1150
// });

});
