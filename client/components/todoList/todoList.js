import React, {Component} from 'react';
import TodoItem from './todoItem/todoItem';
import './todoList.css';

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
        <div className='container__filterSelector'>
          <span className='filterSelector__item'
                onClick={() => {
                  this.props.filterTasks('all')
                }}
          > All </span>
          <span className='filterSelector__item'
                onClick={() => {
                  this.props.filterTasks(true)
                }}
          > Active</span>
          <span className='filterSelector__item'
                onClick={() => {
                  this.props.filterTasks(false)
                }}
          > Done</span>
        </div>

        <ul className='container__todoList'>
          {this.props.tasks.map((task, ind) => {
            if (this.props.show !== 'all' &&
              task.isActive !== this.props.show) {
              return;
            }

            return <TodoItem key={ind}
                             task={task}
                             updateTask={this.props.updateTask}
                             removeTask={this.props.removeTask}
            />
          })}
        </ul>
      </div>
    );
  }
}

export default TodoList;
