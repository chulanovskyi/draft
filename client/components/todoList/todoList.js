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

  handleToggle = (task) => {
    this.props.toggleTask(task.id, !task.isActive);
  };

  render() {
    return (
      <div className='container'>
        <h1 className='container__header'>
          Tasker 3000
        </h1>
        <input
          value={this.state.taskName}
          onChange={(e) => this.setState({taskName: e.target.value})}
          className='container__inputTask'
          onKeyPress={this.handleAddTask}
        />
        <ul className='container__todoList'>
          {this.props.tasks &&
            this.props.tasks.map((task, ind) => {
            return (
              <li key={ind}
                  className='todoList__item'>
                <span
                  onClick={() => this.handleRemoveTask(task.id)}
                  className='item__removeTask'
                >
                  X
                </span>
                <span
                  onClick={() => this.handleToggle(task)}
                  className={task.isActive ? 'item__name' : 'item__name disabled'}
                >
                  {task.name}
                </span>
              </li>
            )
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
