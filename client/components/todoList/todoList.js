import React, {Component} from 'react';
import './todoList.css';

class TodoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: '',
      show: false,
      editedTaskId: '',
      editedName: '',
      showModal: false,
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
    this.setState({showModal: true});
    this.props.removeTask(taskId);
  };

  handleToggle = (task) => {
    this.props.updateTask({id: task.id, isActive: !task.isActive});
  };

  toggleEditIcon = (taskInd) => {
    this.refs[`editTask${taskInd}`].classList.toggle('hidden');
  };

  showEditTask = (task) => {
    this.setState({
      show: true,
      editedName: task.name,
      editedTaskId: task.id
    })
  };

  editTask = (e, task) => {
    console.log(e.key);
    if (e.key === 'Enter') {
      this.setState({
        show: false,
      });
      this.props.updateTask({id: task.id, name: e.target.value});
    }
    this.setState({
      editedTask: e.target.value,
    })
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

            return (
              <li key={ind} className='todoList__item'
                  onMouseEnter={() => this.toggleEditIcon(ind)}
                  onMouseLeave={() => this.toggleEditIcon(ind)}
              >
                <i
                  onClick={() => this.handleRemoveTask(task.id)}
                  className='fa fa-times item__removeTask'
                />

                {this.state.show && this.state.editedTaskId === task.id ?
                  <input className='item__editInput'
                         defaultValue={this.state.editedName}
                         onKeyPress={(e) => this.editTask(e, task)}
                  />
                  :
                  <span
                    onClick={() => this.handleToggle(task)}
                    className={task.isActive ? 'item__name' : 'item__name disabled'}
                  >
                  {task.name}
                  </span>
                }
                <i ref={`editTask${ind}`}
                   className='fa fa-pencil item__editTask hidden'
                   aria-hidden="true"
                   onClick={() => this.showEditTask(task)}
                />
              </li>
            )
          })}
        </ul>

      </div>
    );
  }
}

export default TodoList;
