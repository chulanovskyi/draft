import React from 'react'
import renderer from 'react-test-renderer'
import configureStore from 'redux-mock-store'
import Enzyme, { shallow, mount } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16';
import { initialState } from '../components/todoList/todoReducer'
import DraftAppContainer, {DraftApp} from '../containers/draftApp'

Enzyme.configure({ adapter: new Adapter() });

describe('DraftApp Snapshot', () => {
  const mockStore = configureStore();
  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = mount(<DraftAppContainer store={store} />)
  });

  it('Matches the snapshot', () => {
    const tree = renderer.create(<DraftAppContainer />).toJSON();
    expect(tree).toMatchSnapshot();
  })
});
