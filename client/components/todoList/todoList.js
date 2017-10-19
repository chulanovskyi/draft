import React, {Component} from 'react';
import TodoItem from './todoItem/todoItem';
import OptionMenu from "./optionMenu/optionMenu";
import './todoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
    }
  };

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
          placeholder='Add task'
        />
        <div className='container__isActiveSelector'>
          <span className={this.props.show === 'all' ? BUTTON_ACTIVE : BUTTON}
                onClick={() => this.props.filterTasks('all')}>
            All
          </span>
          <span className={this.props.show === true ? BUTTON_ACTIVE : BUTTON}
                onClick={() => this.props.filterTasks(true)}>
            Active
          </span>
          <span className={this.props.show === false ? BUTTON_ACTIVE : BUTTON}
                onClick={() => this.props.filterTasks(false)}>
            Done
          </span>
        </div>
        <OptionMenu applyOptions={this.props.applyOptions}
                    clearOptions={this.props.clearOptions}
        />
        <ul className='container__todoList'>
          {this.props.tasks.map((task, ind) => {
            if (this.props.show !== 'all' &&
              task.isActive !== this.props.show) {
              return;
            }

            return <TodoItem key={ind}
                             task={task}
                             updateTask={this.props.updateTask}
                             removeTask={this.props.removeTask}/>
          })}
        </ul>
      </div>
    );
  }
}

const BUTTON        = 'isActiveSelector__item';
const BUTTON_ACTIVE = 'isActiveSelector__item active';


export default TodoList;
