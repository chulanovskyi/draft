import React, {Component} from 'react';

export default class DatabaseErrorHandler extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(err, info){
    console.log('Database error');
    console.log(err);
    console.log(info);
    this.setState({
      hasError: true,
    });
  };

  render(){
    if (this.state.hasError) {
      return <div className='errorHandler'>Cannot connect to database</div>;
    } else {
      return this.props.children;
    }
  };
}
