import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Container, Row, Col, Form, Navbar, Spinner } from "react-bootstrap";
import { BubbleChart, IBubbleChart } from "../Charts/BubbleChart";
import { getData } from "../../services/FundingData";
import { ApiStatus } from "../../model/ApiData";
import { chartSlice } from "../../redux/slices/chartSlice";
import { RootState } from "../../redux/rootReducer";

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
   * use react hooks to get the data from api and set it to the store
   */
  useEffect(() => {
    const processData = async () => {
      try {
        /**
         * fetch data from the api
         */
        dispatch(chartSlice.actions.setStatus(ApiStatus.pending));
        const response = await getData();
        dispatch(chartSlice.actions.setApiData(response));
        dispatch(chartSlice.actions.setStatus(ApiStatus.success));

        /**
         * process data for the render
         */
        dispatch(chartSlice.actions.extractCategories());
        dispatch(chartSlice.actions.aggregateData());
      } catch (error) {
        dispatch(chartSlice.actions.setStatus(ApiStatus.error));
      }
    };
    processData();
  }, [dispatch]);

  /**
   * Get data from state
   */
  const { fundingSum, fetchStatus } = useSelector(
    (state: RootState) => state.chart
  );

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
    data: fundingSum,
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
          {fetchStatus === ApiStatus.success && (
            <Col>
              <BubbleChart {...chartData} />
            </Col>
          )}
        </Row>
        <Row className="justify-content-lg-center">
          <Col xs={2}>
            {fetchStatus !== ApiStatus.success && (
              <Spinner animation="border" variant="primary" />
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Funding;
