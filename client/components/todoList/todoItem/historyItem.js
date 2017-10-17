import React, {Component} from 'react';
import ConfirmModal from './confirmModal';
import './historyItem.css';

class HistoryItem extends Component {
  constructor(props){
    super(props);
    this.state = {
      showModal: false,
    }
  }

  componentWillReceiveProps() {
    if (this.state.showModal) {
      this.setState({showModal: false})
    }
  }

  render() {
    const changes = this.props.changes;
    const formatDate = new Date(changes.changedAt).toLocaleString('ua-UA', dateOptions);
    const isStatusProp = changes.prop === 'isActive';
    return (
      <div className='history__change'>
        <i className='fa fa-times change__remove'
           onClick={() => this.setState({showModal: true})}
        />
        <div className='change__header'>
          <span className='change__prop'>{propNames[changes.prop]}</span>
          <span className='change__date'>{formatDate}</span>
        </div>
        <div className='change__body'>
          <span className='change__from' title={isStatusProp ? null : changes.from}>
            {isStatusProp ?
              propNames.condition[changes.from] :
              changes.from}
          </span>
          <i className='fa fa-arrow-right change__arrow'/>
          <span className='change__to' title={isStatusProp ? null : changes.to}>
            {isStatusProp ?
              propNames.condition[changes.to] :
              changes.to}
          </span>
        </div>

        {this.state.showModal &&
          <ConfirmModal showModal={this.state.showModal}
                        closeModal={() => this.setState({showModal: false})}
                        removeItem={this.props.removeHistory}
                        confirmText='Delete history record?'
          />
        }
      </div>
    )
  }
}

const propNames = {
  'name': 'Text',
  'isActive': 'Status',
  'condition': {
    'true': 'active',
    'false': 'done',
  }
};

const dateOptions = {
  month: 'long',
  day: 'numeric',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
  second: '2-digit',
  hour12: false,
};

export default HistoryItem;
