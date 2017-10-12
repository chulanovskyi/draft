import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from '../components/todoList/todoActions';
import TodoList from '../components/todoList/todoList';
import ErrorHandler from '../components/errorHandlers/databaseError';

class DraftApp extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.getTasks();
  }

  render() {
    return (
      <ErrorHandler>
        <TodoList
          tasks={this.props.tasks}
          addTask={this.props.addTask}
          removeTask={this.props.removeTask}
          toggleTask={this.props.toggleTask}
        />
      </ErrorHandler>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.todoReducer.tasks,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(todoActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftApp);
