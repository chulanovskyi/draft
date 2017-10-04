import React, {Component} from 'react';
import '../../public/stylesheets/todoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
    }
  }

  handleAddTask = (e) => {
    if (e.key === 'Enter') {
      this.props.addTask(e.target.value);
      this.setState({
        taskName: '',
      })
    }
  };

  handleRemoveTask = (taskId) => {
    this.props.removeTask(taskId);
  };

  render() {
    return (
      <div className='container'>
        <h1 className='container__header'>
          {this.props.draftState.welcomeText || ''}
        </h1>
        <input
          value={this.state.taskName}
          onChange={(e) => this.setState({taskName: e.target.value})}
          className='container__inputTask'
          onKeyPress={this.handleAddTask}
        />
        <ul className='container__todoList'>
          {this.props.draftState.tasks.map((task, ind) => {
            return (
              <li key={ind} className='todoList__item'>
                <span
                  onClick={() => this.handleRemoveTask(task.id)}
                  className='item__removeTask'
                >
                  X
                </span>
                {task.name}
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
