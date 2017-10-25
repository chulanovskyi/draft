import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';
import Adapter from 'enzyme-adapter-react-16';
import OptionMenu from '../components/todoList/optionMenu/optionMenu.js';

Enzyme.configure({ adapter: new Adapter() });

describe('<OptionMenu />', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = mount(<OptionMenu applyOptions={jest.fn()} clearOptions={jest.fn()}/>);
  });

  it('should match its snapshot', () => {
    const tree = renderer.create(<OptionMenu />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders a `.container__options`', () => {
    expect(wrapper.find('.container__options')).toHaveLength(1);
  });

  it('should not showing options menu after rendering', () => {
    expect(wrapper.find('.options__optionList')).toHaveLength(0);
  });

  it('should show option menu on click', () => {
    wrapper.find('.options__caret').simulate('click');
    expect(wrapper.find('.options__optionList')).toHaveLength(1);
  })

  // it('changes state on editing task name', () => {
  //   wrapper.find('.item__editTask').simulate('click');
  //   const inp = wrapper.find('.item__editInput');
  //   const code = 's'.charCodeAt(0);
  //   inp.simulate('keypress', {which: code, key: 's', keyCode: code}); // Received an action, but input not changing
  //   expect(wrapper.state('editedName')).toBe('read books');
  // });

  // it('show modal on todoItem remove request', () => {
  //   wrapper.find('.item__removeTask').simulate('click');
  //   expect(wrapper.find('.modal__header')).toHaveLength(1);
  // });
  // issue with React 16 Portals (modals) https://github.com/airbnb/enzyme/issues/1150
});
