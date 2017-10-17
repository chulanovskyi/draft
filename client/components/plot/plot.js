import React, {Component} from 'react';
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3';
import './plot.css'

class Plot extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  componentDidMount() {
    const svg = d3.select('.plot');
    // svg.append('rect')
    //   .attr('y', 30)
    //   .attr('x', 30)
    //   .attr('width', 250)
    //   .attr('height', 150)
    // ;
    console.log(svg);
  }

  render() {
    return (
      <div className='container__plot'>
        <svg width={300} height={700} className='plot'/>
      </div>
    )
  }
}

export default ReactFauxDOM.withFauxDOM(Plot);
