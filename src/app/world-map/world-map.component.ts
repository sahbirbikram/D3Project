import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as topojson from "topojson-client";

@Component({
  selector: 'app-world-map',
  templateUrl: './world-map.component.html',
  styleUrls: ['./world-map.component.css']
})
export class WorldMapComponent implements OnInit {

  private CHART_WIDTH = 900;
  private CHART_HEIGHT = 560;

  constructor() { }

  private renderWorldMap() {
    const svg = d3.select('#worldMap')
    .attr('width', this.CHART_WIDTH)
    .attr('height', this.CHART_HEIGHT);

    const projection = d3
    .geoMercator()
    .scale(130)
    .translate([this.CHART_WIDTH/2, this.CHART_HEIGHT/1.4]);

    const path = d3.geoPath(projection);

    const g = svg.append('g');

    d3.json('https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json')
      .then((data:any) => {
        // console.log(data.objects.countries);
        const countries = topojson.feature(data, data.objects.countries);
        console.log(countries);

        g.selectAll('path')
        .data(countries.features)
        .enter()
        .append('path')
        .classed('country', true)
        .attr('d', path)
        .attr('fill', '#999999')
        .attr('stroke', '#cccccc');
      });
  }

  ngOnInit(): void {
    this.renderWorldMap();
  }

}
