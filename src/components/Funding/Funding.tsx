import React from "react";
import { Container, Row, Col, Form, Navbar } from "react-bootstrap";

interface IFundingProps {}

const Funding: React.FC<IFundingProps> = (props: IFundingProps) => {
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
   */
  const showGraph = (event: any) => {
    console.log(event.target.value);
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
      </Container>
    </>
  );
};

export default Funding;
