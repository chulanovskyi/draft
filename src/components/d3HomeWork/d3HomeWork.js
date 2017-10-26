import React, {Component} from 'react';
import ReactFauxDOM from 'react-faux-dom'
import * as d3 from 'd3';
import './d3HomeWork.scss'

const scores = [
  { name: 'Alice', score: 96 },
  { name: 'Billy', score: 74 },
  { name: 'Willy', score: 88 },
  { name: 'David', score: 65 },
  { name: 'Jon', score: 50 },
  { name: 'Rick', score: 61 },
  { name: 'Roy', score: 42 },
  { name: 'Tom', score: 82 }
];

export class D3HomeWork extends Component {
  render() {
    const svg = ReactFauxDOM.createElement('svg');

    const svgHeight = 400;

    const [scoreMin, scoreMax] = d3.extent(scores, (s) => s.score);

    const barWidth = 30;

    const svgWidth = scores.length * barWidth + 5;

    const maxPropertyLength = d3.max(scores, (s) => s.score);

    const colors = d3.scaleSequential(d3.interpolateRainbow)
      .domain([scoreMin, scoreMax]);

    const propertyScale = d3.scaleLinear()
      .domain([0, maxPropertyLength])
      .range([0, 300]);

    const plot = d3.select(svg)
      .attr('width', svgWidth)
      .attr('height', svgHeight)
      .style('border', '1px solid #FFF')
      .style('border-radius', '5px');

    plot.append('text')
      .attr('x', '39%')
      .attr('y', '20px')
      .attr('font-size', '20px')
      .attr('fill', '#FFF')
      .append('tspan')
      .style('width', '100%')
      .style('color', '#FFF')
      .style('text-align', 'center')
      .text('Scores');

    const gWrap = plot.append('g')
      .attr('transform', 'translate(5, 40)');

    const itemGroup = gWrap.selectAll('g')
      .data(scores);

    const newItemGroup = itemGroup
      .enter()
      .append('g')
      .attr('transform', (s, i) => `translate(${i * barWidth}, 0)`);

    newItemGroup
      .append('rect')
      .attr('class', 'task__bar')
      .attr('width', barWidth - 5)
      .attr('height', (s) => propertyScale(s.score))
      .style('fill', (s) => colors(s.score))
      .append('title')
      .text((t) => t.name);

    newItemGroup
      .append('text')
      .attr('x', 5)
      .attr('y', svgHeight - 45)
      .style('fill', '#FFF')
      .text((s) => s.score);

    return svg.toReact();
  }
}

export default D3HomeWork
