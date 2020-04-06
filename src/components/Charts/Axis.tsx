import React, { useEffect } from "react";
import { select, Axis } from "d3";

interface IAxisComponent {
  scale: Axis<number | {valueOf(): number}>;
  transform: string;
}

/**
 * AxisComponent
 * Creates a d3 axis 
 */
export const AxisComponent: React.FC<IAxisComponent> = (
  props: IAxisComponent
) => {
  const { scale, transform } = props;
  const axisRef: React.RefObject<SVGGElement> = React.createRef<SVGGElement>();
  useEffect(() => {
    const node = axisRef.current;
    const scale1 = scale as any; // TODO: fix it later
    select(node).call(scale1);
  }, [select, axisRef, scale]);

  return <g className="axis" transform={transform} ref={axisRef} />;
};
