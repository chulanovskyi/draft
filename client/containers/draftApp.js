import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as rootActions from '../actions';
import * as todoActions from '../components/todoList/todoActions';
import TodoList from '../components/todoList/todoList';

class DraftApp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getStarted();
    this.props.getTasks();
  }

  render() {
    return (
      <div>
        <TodoList
          addTask={this.props.addTask}
          removeTask={this.props.removeTask}
          draftState={this.props.draftState}
        />
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    draftState: state
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Object.assign({}, rootActions, todoActions), dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftApp);
