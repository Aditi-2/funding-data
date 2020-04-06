import React from "react";
import { IFundingObject } from "../../model/ApiData";
import { Table, TableProps } from "react-bootstrap";

export interface ITableProps extends TableProps{
    tableData: IFundingObject[],
    tableHeader: string[]
}

/**
 * Table component to render the given category data from circles
 */
export const TableComponent: React.FC<ITableProps> = (props: ITableProps) => {
  const { tableData, tableHeader, ...rest } = props;
  return (
    <Table {...rest}>
      <thead>
        <tr>
          {tableHeader.map((header: string, i: number) => {
            return <th key={i}>{header}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {tableData.map((data: IFundingObject, index: number) => {
          return (
            <tr key={index}>
              {tableHeader.map((header: string, i: number) => {
                return <td key={i}>{data[header]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};
