import React from "react";
import { useDispatch } from "react-redux";
import { GraphDataPoint } from "../../model/GraphData";
import { chartSlice } from "../../redux/slices/chartSlice";
import { ScaleLinear } from "d3";

interface IScale {
  xScale: ScaleLinear<number, number>;
  yScale: ScaleLinear<number, number>;
  zScale: ScaleLinear<number, number>;
  fillScale: any; // ScaleOrdinal returns string | unknown and fill takes string | undeined
}

export interface ICirclesProps{
  points: GraphDataPoint[];
  scale: IScale;
  transform: string
  xaxis: string;
  yaxis: string;
}

/**
 * Given a list/array of points renders the Circles/bubbles
 */
export const Circles: React.FC<ICirclesProps> = (props: ICirclesProps) => {
  const { points, scale, xaxis, yaxis, ...rest } = props;
  const dispatch = useDispatch();
  const handleClick = (data: GraphDataPoint) => {
    dispatch(chartSlice.actions.setTableData(data.tableData));
  };
  return (
    <g className="circles" {...rest}>
      {points.map((data: GraphDataPoint, i: number) => {
        return (
          <g
            key={i}
            onClick={() => {
              handleClick(data);
            }}
          >
            <circle
              cx={scale.xScale(data[xaxis])}
              cy={scale.yScale(data[yaxis])}
              r={scale.zScale(data[xaxis])}
              fill={scale.fillScale(data.label)}
            />
            <text
              dx={scale.xScale(data[xaxis]) - scale.zScale(data[xaxis]) * 0.55}
              dy={scale.yScale(data[yaxis])}
              fontSize={scale.zScale(data[xaxis]) * 0.3}
            >
              {data.label}
            </text>
          </g>
        );
      })}
    </g>
  );
};
