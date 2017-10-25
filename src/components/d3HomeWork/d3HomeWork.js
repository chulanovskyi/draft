import React, {Component} from 'react';
// import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import './d3HomeWork.scss'

export class D3HomeWork extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='homework__container'>Norm 4e</div>
    );
  }
}
//
// function mapStateToProps(state) {
//   return {};
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(null, dispatch);
// }

// export default connect(mapStateToProps, mapDispatchToProps)(D3HomeWork);
export default D3HomeWork
