import React, {Component} from 'react';
import Modal from 'react-modal';
import './todoItem.css';

const taskModalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
  overlay: {
    backgroundColor: 'rgba(200,200,200,0.2)',
  }
};

class TodoItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      editedTaskId: '',
      editedName: '',
      showModal: false,
    }
  }

  handleToggle = (task) => {
    this.props.updateTask({id: task.id, isActive: !task.isActive});
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
        id: task.id,
        name: task.name,
        history: task.history,
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

  render() {
    const task = this.props.task;
    return (
      <li className='todoList__item'>
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
        <i className='fa fa-pencil item__editTask'
           aria-hidden="true"
           onClick={() => this.showEditTask(task)}
        />
        <i
          onClick={() => this.openModal()}
          className='fa fa-times item__removeTask'
        />
        {this.state.showModal &&
          <Modal
            isOpen={this.state.showModal}
            onRequestClose={() => this.setState({showModal: false})}
            style={taskModalStyles}
          >
            <div className='modal__header'>Delete task?</div>
            <div className='modal__buttons'>
              <span className='buttons__item'
                    onClick={() => this.handleRemoveTask(task.id)}
              >Yes</span>
              <span className='buttons__item'
                    onClick={() => this.setState({showModal: false})}
              >No</span>
            </div>
          </Modal>
        }
      </li>
    )
  }
}

export default TodoItem;
