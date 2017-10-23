import Modal from 'react-modal';
import React, {Component} from 'react';
import './confirmModal.css';

class ConfirmModal extends Component {
  render() {
    return (
      <Modal
        isOpen={this.props.showModal}
        onRequestClose={() => this.props.closeModal()}
        style={modalStyles}
      >
        <div className='modal__header'>{this.props.confirmText}</div>
        <div className='modal__buttons'>
            <span className='buttons__item'
                  onClick={this.props.removeItem}
            >Yes</span>
          <span className='buttons__item'
                onClick={() => this.props.closeModal()}
          >No</span>
        </div>
      </Modal>
    )
  }
}

const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    minWidth: '140px',
  },
  overlay: {
    backgroundColor: 'rgba(200,200,200,0.2)',
  }
};

export default ConfirmModal;
