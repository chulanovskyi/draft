import React, {Component} from 'react';
import * as R from 'ramda';
import HistoryItem from './historyItem';
import ConfirmModal from './confirmModal';
import './todoItem.css';

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editedTaskId: '',
      editedName: '',
      showModal: false,
      showHistory: false,
    }
  }

  componentWillReceiveProps(props) {
    // if (props.expanded !== this.state.showHistory) {
    //   this.setState({showHistory: props.expanded})
    // }
  }

  handleToggle = (task) => {
    this.props.updateTask({task, newStatus: !task.isActive});
  };

  showEditTask = (task) => {
    this.setState({
      show: true,
      editedName: task.name,
      editedTaskId: task.id
    })
  };

  editTask = (e, task) => {
    if (e.key === 'Enter') {
      this.setState({
        show: false,
      });
      this.props.updateTask({
        task,
        newName: e.target.value,
      });
    }
    this.setState({
      editedTask: e.target.value,
    })
  };

  openModal = () => {
    this.setState({showModal: true});
  };

  handleRemoveTask = (taskId) => {
    this.setState({showModal: false});
    this.props.removeTask(taskId);
  };

  showHistory = () => {
    this.setState({showHistory: !this.state.showHistory});
  };

  handleRemoveHistory = (changedAt) => {
    const updated = R.dissoc('history', this.props.task);
    updated.history = R.filter((changes) => changes.changedAt !== changedAt, this.props.task.history);
    this.props.updateTask({task: updated});
  };

  render() {
    const task = this.props.task;
    return (
      <li className='todoList__item'>
        {this.state.show && this.state.editedTaskId === task.id ?
          <input className='item__editInput'
                 defaultValue={this.state.editedName}
                 onKeyPress={(e) => this.editTask(e, task)}/>
          :
          <div className='item__nameContainer'>
            <i className={task.isActive ?
              'fa fa-circle-o nameContainer__status' :
              'fa fa-check-circle-o nameContainer__status'}
               onClick={() => this.handleToggle(task)}/>
            <span
              title={task.name}
              onClick={() => this.showHistory(task)}
              className={task.isActive ? 'nameContainer__name' : 'nameContainer__name disabled'}>
                {task.name}
            </span>
            <i className='fa fa-pencil item__editTask'
               onClick={() => this.showEditTask(task)}/>
          </div>
        }

        <i onClick={() => this.openModal()}
           className='fa fa-times item__removeTask'/>

        <div className={this.state.showHistory ? 'item__history' : 'hidden'}>
          {task.history.map((changes, ind) => {
            return <HistoryItem changes={changes}
                                key={ind}
                                removeHistory={() => this.handleRemoveHistory(changes.changedAt)}/>
          })}
        </div>

        {this.state.showModal &&
          <ConfirmModal showModal={this.state.showModal}
                        closeModal={() => this.setState({showModal: false})}
                        removeItem={() => this.handleRemoveTask(task.id)}
                        confirmText='Delete task?'
          />
        }
      </li>
    )
  }
}

export default TodoItem;
