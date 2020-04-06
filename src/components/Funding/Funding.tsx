import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Navbar, Spinner } from "react-bootstrap";
import { BubbleChart, IBubbleChart } from "../Charts/BubbleChart";

interface IFundingProps {}

interface IFundingState {
  graphType: string;
  xaxis: string;
  yaxis: string;
}

const Funding: React.FC<IFundingProps> = (props: IFundingProps) => {
  const dispatch = useDispatch();
  const initalState = {
    graphType: "1",
    xaxis: "x",
    yaxis: "y",
  };
  const [value, setValue] = useState<IFundingState>(initalState);
  const { graphType, yaxis, xaxis } = value;
  /**
   * Get data from state
   */

  /**
   * Array for graph selector
   */
  const selections = [
    {
      label: "Funding amount",
      value: 1,
    },
    {
      label: "Number of funding rounds(per category)",
      value: 2,
    },
  ];

  /**
   * Handle onChange method of select
   * Used to switch graphs
   */
  const showGraph = (event: any) => {
    if (event.target.value === "2") {
      setValue({
        graphType: event.target.value,
        xaxis: "y",
        yaxis: "x",
      });
    }
    if (event.target.value === "1") {
      setValue(initalState);
    }
  };

  /**
   * Prepare chart data
   */
  const chartData: IBubbleChart = {
    height: 512,
    width: 1024,
    margin: 20,
    data: [
      {
        x: 10,
        y: 20,
        label: "beauty"
      },
      {
        x: 5,
        y: 30,
        label: "games"
      },
      {
        x: 30,
        y: 12,
        label: "automotive"
      }
    ],
    graphType,
    xaxis,
    yaxis,
  };

  return (
    <>
      <Navbar bg="light" expand="lg" className="navbar">
        <Navbar.Brand>Funding by industry analytics</Navbar.Brand>
      </Navbar>
      <Container fluid>
        <Row className="justify-content-md-center">
          <Col xs={4} className="select-box">
            <Form.Group
              as={Row}
              className="justify-content-md-center"
              controlId="fundingForm.ControlSelect1"
            >
              <Form.Label column sm="3">
                Data:
              </Form.Label>
              <Col sm="6">
                <Form.Control as="select" onChange={showGraph}>
                  {selections.map((data, index) => {
                    return (
                      <option value={data.value} key={index}>
                        {data.label}
                      </option>
                    );
                  })}
                </Form.Control>
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <BubbleChart {...chartData} />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Funding;
