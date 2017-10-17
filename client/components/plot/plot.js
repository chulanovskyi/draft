import React, {Component} from 'react';
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3';
import './plot.css'

class Plot extends Component {
  render() {
    const svg = ReactFauxDOM.createElement('svg');

    const barHeight = 30;
    const maxPropertyLength = d3.max(this.props.tasks, (task) => task[this.props.baseProp].length);

    const propertyScale = d3.scaleLinear()
      .domain([0, maxPropertyLength])
      .range([0, 300]);

    const plot = d3.select(svg)
      .attr('width', '350px')
      .attr('height', '600px')
      .style('border', '1px solid #FFF')
      .style('border-radius', '5px');

    plot.append('text')
      .attr('x', '33%')
      .attr('y', '20px')
      .attr('font-size', '20px')
      .attr('fill', '#FFF')
      .append('tspan')
      .style('width', '100%')
      .style('color', '#FFF')
      .style('text-align', 'center')
      .text(this.props.plotHeader);

    const gWrap = plot.append('g')
      .attr('transform', 'translate(0, 40)');

    const itemGroup = gWrap.selectAll('g')
      .data(this.props.tasks);

    const newItemGroup = itemGroup
      .enter()
      .append('g')
      .attr('transform', (t, i) => `translate(0, ${i*barHeight})`);

    newItemGroup
      .append('rect')
      .attr('class', 'task__bar')
      .attr('width', (t) => propertyScale(t[this.props.baseProp].length))
      .attr('height', barHeight-5)
      .style('fill', '#80D8FF')
      .append('title')
      .text((t) => t.name);

    newItemGroup
      .append('text')
      .attr('x', 320)
      .attr('y', 18)
      .style('fill', '#FFF')
      .text((t) => t[this.props.baseProp].length);

    return svg.toReact();
  }
}

export default ReactFauxDOM.withFauxDOM(Plot);
