import React, {Component} from 'react';
import TodoItem from './todoItem/todoItem';
import './todoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      expanded: false,
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

  expandAll = () => {
    this.setState({expanded: !this.state.expanded})
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
          placeholder='Add task'
        />
        <div className='container__filterSelector'>
          <span className={this.props.show === 'all' ? FILTER_ACTIVE : FILTER}
                onClick={() => this.props.filterTasks('all')}>
            All
          </span>
          <span className={this.props.show === true ? FILTER_ACTIVE : FILTER}
                onClick={() => this.props.filterTasks(true)}>
            Active
          </span>
          <span className={this.props.show === false ? FILTER_ACTIVE : FILTER}
                onClick={() => this.props.filterTasks(false)}>
            Done
          </span>
        </div>
        {/*<span className='filterSelector__item item__expand'*/}
              {/*onClick={() => {this.expandAll()}}*/}
        {/*>{this.state.expanded ? 'Collapse' : 'Expand'}</span>*/}
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
                             expanded={this.state.expanded}
            />
          })}
        </ul>
      </div>
    );
  }
}

const FILTER        = 'filterSelector__item';
const FILTER_ACTIVE = 'filterSelector__item active';

export default TodoList;
