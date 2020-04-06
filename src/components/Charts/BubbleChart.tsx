import React from "react";
import {
  max,
  min,
  axisLeft,
  axisBottom,
  schemeSet2,
  scaleLinear,
  scaleOrdinal,
} from "d3";
import { Circles } from "./Circles";
import { AxisComponent } from "./Axis";

export interface IBubbleChart {
  height: number;
  width: number;
  margin: number;
  data: any[];
  graphType: string;
  xaxis: string;
  yaxis: string;
}

/**
 * BubbleChart Component with x and y axis 
 */
export const BubbleChart: React.FC<IBubbleChart> = (props: IBubbleChart) => {
  const { data, height, width, margin, graphType, xaxis, yaxis } = props;
  /**
   * extract x and y values
   */
  const xValues: number[] = data.map((d) => d[xaxis]);
  const yValues: number[] = data.map((d) => d[yaxis]);

  /**
   * extract label list for color selection
   */
  const fillValues: string[] = data.map((d) => d.label);

  /**
   * fix for bubble size in diff graphs, in-general should come from configuration file
   */
  const sizeUpperRange = graphType === "2" ? 20 : 55;

  /**
   * create all the required scales
   */
  const xScale = scaleLinear()
    .domain([0, max(xValues) || 0])
    .range([0, width - 5 * margin])
    .nice();
  const yScale = scaleLinear()
    .domain([0, max(yValues) || 0])
    .range([height - 3 * margin, 0])
    .nice();
  const zScale = scaleLinear()
    .domain([min(xValues) || 0, max(xValues) || 0])
    .range([20, sizeUpperRange]);

  const fillScale = scaleOrdinal().domain(fillValues).range(schemeSet2);

  /**
   * Calculate positions
   */
  const xAxisPosition =
    graphType === "2"
      ? `translate(${margin * 2}, ${height - margin - margin})`
      : `translate(${margin}, ${height - margin - margin})`;

  const yAxisPosition =
    graphType === "2"
      ? `translate(${margin * 2}, ${margin})`
      : `translate(${margin}, ${margin})`;

  const circleTranform =
    graphType === "2"
      ? `translate(${margin}, 0)`
      : `translate(${margin * 2}, ${margin})`;

  return (
    <svg width={width} height={height} className="chart">
      <g
        transform={"translate(" + margin + "," + margin + ")"}
        width={width}
        height={height}
        className="main"
      >
        <Circles
          points={data}
          scale={{ xScale, yScale, zScale, fillScale }}
          transform={circleTranform}
          xaxis={xaxis}
          yaxis={yaxis}
        />
        <AxisComponent transform={xAxisPosition} scale={axisBottom(xScale)} />
        <AxisComponent transform={yAxisPosition} scale={axisLeft(yScale)} />
      </g>
    </svg>
  );
};
