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
  { name: 'Tom', score: 82 },
  { name: 'Sith', score: 1 },
  { name: 'Jedi', score: 100 }
];

export class D3HomeWork extends Component {
  render() {
    const root = document.getElementById('root');
    root.style.textAlign = 'center';

    const barWidth = 50;
    const svgHeight = 400;
    const svgWidth = scores.length * barWidth + 5;
    const barBottomTextPadding = 65;
    const barTopTextPadding = 80;

    const svg = ReactFauxDOM.createElement('svg');

    const [scoreMin, scoreMax] = d3.extent(scores, (s) => s.score);
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
      .attr('x', `${svgWidth / 2 - 25}`)
      .attr('y', '20px')
      .attr('font-size', '20px')
      .attr('fill', '#FFF')
      .append('tspan')
      .style('color', '#FFF')
      .text('Scores');

    const gWrap = plot.append('g')
      .attr('transform', `translate(5, 40)`);

    const itemGroup = gWrap.selectAll('g')
      .data(scores);

    const newItemGroup = itemGroup
      .enter()
      .append('g')
      .attr('class', 'container__bar')
      .attr('transform', (s, i) => `translate(${i * barWidth - 5}, 0)`);

    newItemGroup
      .append('text')
      .attr('x', barWidth/2 - 8)
      .attr('y', (s) => svgHeight - propertyScale(s.score) - barTopTextPadding)
      .style('fill', '#FFF')
      .text((s) => s.score);

    newItemGroup
      .append('rect')
      .attr('class', 'task__bar')
      .attr('width', barWidth - 5)
      .attr('height', (s) => propertyScale(s.score))
      .attr('transform', (s, i) => `translate(${barWidth}, ${svgHeight - barBottomTextPadding}) rotate(180)`)
      .style('fill', (s) => colors(s.score))
      .append('title')
      .text((t) => t.name);

    newItemGroup
      .append('text')
      .attr('x', 10)
      .attr('y', svgHeight - 45)
      .style('fill', '#FFF')
      .text((s) => s.name);

    return svg.toReact();
  }
}

export default D3HomeWork
