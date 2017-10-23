import React, {Component} from 'react';

export default class DatabaseErrorHandler extends Component {
  constructor(props){
    super(props);
    this.state = {
      hasError: false,
    }
  }

  componentDidCatch(err, info){
    console.log("Can't render element");
    console.log(err);
    console.log(info);
    this.setState({
      hasError: true,
    });
  };

  render(){
    if (this.state.hasError) {
      return <div className='errorHandler'>Cannot render element</div>;
    } else {
      return this.props.children;
    }
  };
}
