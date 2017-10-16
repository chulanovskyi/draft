import React, {Component} from 'react';
import Modal from 'react-modal';
import './todoItem.css';

const propNames = {
  'name': 'Text',
  'isActive': 'Status',
  'condition': {
    'true': 'active',
    'false': 'done',
  }
};

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
      showHistory: false,
    }
  }

  componentWillReceiveProps(props) {
    if (props.expanded !== this.state.showHistory) {
      this.setState({showHistory: props.expanded})
    }
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

  render() {
    const task = this.props.task;
    return (
      <li className='todoList__item'>
        {this.state.show && this.state.editedTaskId === task.id ?
          <input className='item__editInput'
                 defaultValue={this.state.editedName}
                 onKeyPress={(e) => this.editTask(e, task)}/>
          :
          <span
            title={task.name}
            onClick={() => this.handleToggle(task)}
            className={task.isActive ? 'item__name' : 'item__name disabled'}>
              {task.name}
          </span>
        }

        <i className='fa fa-pencil item__editTask'
           onClick={() => this.showEditTask(task)}/>
        <i onClick={() => this.openModal()}
           className='fa fa-times item__removeTask'/>
        <i className='fa fa-caret-down item__showHistory'
           onClick={() => this.showHistory(task)}/>

        <div className={this.state.showHistory ? 'item__history' : 'hidden'}>
          {task.history.map((change, ind) => {
            const formatDate = new Date(change.changedAt).toLocaleString('ua-UA', {hour12: false});
            const isStatusProp = change.prop === 'isActive';
            return (
              <div className='history__change' key={ind}>
                <div className='change__header'>
                  <span className='change__date'>{formatDate}</span>
                  <span className='change__prop'>{propNames[change.prop]}</span>
                </div>
                <div className='change__body'>
                  <span className='change__from' title={isStatusProp ? null : change.from}>
                    {isStatusProp ?
                      propNames.condition[change.from] :
                      change.from}
                    </span>
                  <i className='fa fa-arrow-right change__arrow'/>
                  <span className='change__to' title={isStatusProp ? null : change.to}>
                    {isStatusProp ?
                      propNames.condition[change.to] :
                      change.to}
                  </span>
                </div>
              </div>
            )
          })}
        </div>

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
