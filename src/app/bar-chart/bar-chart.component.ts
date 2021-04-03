import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class BarChartComponent implements OnInit {

  private DUMMY_DATA = [
    { id: 'd1', region: 'USA', value: 10 },
    { id: 'd2', region: 'India', value: 12 },
    { id: 'd3', region: 'China', value: 11 },
    { id: 'd4', region: 'Germany', value: 6 },
  ];

  private selectedData = this.DUMMY_DATA;

  private MARGINS = { top: 20, bottom: 10 };
  private CHART_WIDTH = 600;
  private CHART_HEIGHT = 400 - this.MARGINS.bottom - this.MARGINS.top;

  private x = d3.scaleBand().rangeRound([0, this.CHART_WIDTH]).padding(0.1);
  private y = d3.scaleLinear().range([this.CHART_HEIGHT, 0]);

  private unselectedIds = [];
  private chart;

  private chartInit() {
    const chartContainer = d3
    .select('svg')
    .attr('width', this.CHART_WIDTH)
    .attr('height', this.CHART_HEIGHT + this.MARGINS.top + this.MARGINS.bottom);
  
    this.x.domain(this.DUMMY_DATA.map((d) => d.region));
    this.y.domain([0, d3.max(this.DUMMY_DATA, d => d.value) + 3]);
  
    this.chart = chartContainer.append('g');

    this.chart.append('g')
    .call(d3.axisBottom(this.x).tickSizeOuter(0))
    .attr('transform', `translate(0, ${this.CHART_HEIGHT})`)
    .attr('color', '#4f009e');

  
  }


  constructor() { }

  private barChartFunction() {

    const listItems = d3
    .select('#data')
    .select('ul')
    .selectAll('li')
    .data(this.DUMMY_DATA)
    .enter()
    .append('li');

    listItems
    .append('span')
    .text(data => data.region);

    listItems
    .append('input')
    .attr('type', 'checkbox')
    .attr('checked', true)
    .on('change', (event, data) => {
      if(this.unselectedIds.indexOf(data.id) === -1) {
        this.unselectedIds.push(data.id);
      } else {
        this.unselectedIds = this.unselectedIds.filter(id => id !== data.id);
      }

      this.selectedData = this.DUMMY_DATA.filter(
        (d) => this.unselectedIds.indexOf(d.id) === -1
      )
      this.renderChart();
    });




  }

  private renderChart() {

    this.chart.selectAll('.bar')
    .data(this.selectedData, data => data.id)
    .enter()
    .append('rect')
    .classed('bar', true)
    .attr('width', this.x.bandwidth())
    .attr('height', data =>  this.CHART_HEIGHT - this.y(data.value))
    .attr('x', (data) => this.x(data.region))
    .attr('y', (data) => this.y(data.value));

    this.chart.selectAll('.bar').data(this.selectedData, data => data.id).exit().remove();

    this.chart
    .selectAll('.label')
    .data(this.selectedData, data => data.id)
    .enter()
    .append('text')
    .text((data) => data.value)
    .attr('x', data => this.x(data.region) + this.x.bandwidth()/2)
    .attr('y', data => this.y(data.value) -20)
    .attr('text-anchor', 'middle')
    .classed('label', true);

    this.chart.selectAll('.label').data(this.selectedData, data => data.id).exit().remove();

  }

  ngOnInit(): void {
    this.chartInit();
    this.renderChart();
    this.barChartFunction();
  }

}
