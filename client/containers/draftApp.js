import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import * as todoActions from '../components/todoList/todoActions';
import TodoList from '../components/todoList/todoList';
import ErrorHandler from '../components/errorHandlers/commonError';

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
          show={this.props.show}
          addTask={this.props.addTask}
          removeTask={this.props.removeTask}
          updateTask={this.props.updateTask}
          filterTasks={this.props.filterTasks}
        />
      </ErrorHandler>
    );
  }
}

function mapStateToProps(state) {
  return {
    tasks: state.todoReducer.tasks,
    show: state.todoReducer.show,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(todoActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(DraftApp);
