import { Component, OnInit } from '@angular/core';
import * as d3 from "d3";
import { arc } from 'd3';

@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.css']
})
export class PieChartComponent implements OnInit {

  private data = [
    { name: 'Chrome', value: 30 },
    { name: 'Safari', value: 25 },
    { name: 'IE', value: 10 },
    { name: 'FireFox', value: 21 },
    { name: 'Edge', value: 14 },

  ];

  constructor() { }

  private CHART_WIDTH = 400;
  private CHART_HEIGHT = 400;
  private pieFunction() {

    // Selecting SVG using d3.select()
    const svg = d3.select('#pieChart')
    .attr('width', this.CHART_WIDTH)
    .attr('height', this.CHART_HEIGHT);

    // Creating Pie generator
    const pie = d3.pie<any>().value((d: any) => Number(d.value));
    const data_ready = pie(this.data);

    const radius = 200;
    const g = svg
    .append('g')
    .attr('transform', `translate(${this.CHART_WIDTH/2}, ${this.CHART_HEIGHT/2})`);

    const color = d3.scaleOrdinal(['chartreuse', 'yellow', 'palevioletred', 'sandybrown','dodgerblue']);

    // Creating arc
    const arc = d3.arc().outerRadius(radius).innerRadius(0);

    const label = d3.arc().outerRadius(radius).innerRadius(radius - 150);

    //Grouping different pies
    const pies = g
    .selectAll('.arc')
    .data(data_ready)
    .enter()
    .append('g')
    .classed('arc', true);

    pies
    .append('path')
    .attr('d', <any>arc)
    .attr('fill', d => color(d.data.value));

    pies.append('text')
    .attr('transform', (d) => `translate(${label.centroid(<any>d)})`)
    .text(d => d.data.name)


  }

  ngOnInit(): void {

    this.pieFunction();
  }

}
