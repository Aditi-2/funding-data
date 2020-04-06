export interface GraphDataPoint {
    x: number;
    y: number;
    label: string;
    [x: string]: any; // add generic entry so we are able to add more values the don't effect graph data
  }
  