import React, { Component } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Dropdown
} from "react-bootstrap";
import './item.css'
import data from "./data.json";

class Items extends Component {
  async componentDidMount() {
    this.setState({ loading: true });
    const url = "https://api.exchangeratesapi.io/latest?base=INR";
    const response = await fetch(url);
    const jsonResponse = await response.json();
    this.setState({ currencyRates: jsonResponse.rates, loading: false ,currency : 'INR'});
    console.log(this.state.currencyRates);
  }
  onClickHandler = event => {
    const value = event.target.innerHTML;
    const cost = this.state.currencyRates[value]
    this.setState({ currency : value })
    data.forEach((each) =>{
        console.log(each.cost, cost)
        each.cost = each.cost * cost;
        each.currency = value;
    })
  };
  render() {
    // const products = data.productsList;
    // console.log(this.state.currencyRates)
    return (
      <React.Fragment>
        <Container>
          <Row>
            {data.map(each => {
              return (
                <Col key={each.id}>
                  <Card style={{ width: "18rem" }}>
                    <Card.Img key={each.id} variant="top" src={each.image} />
                    <Card.Body>
                      <Card.Text className="textColor">
                        {each.cost} {each.currency}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              );
            })}

            <Col>
            
              {!this.state || this.state.loading ? (
                <div>loading......</div>
              ) : (
                (console.log(this.state.currencyRates),
                (
                  <Dropdown >
                    <Dropdown.Toggle id="dropdown-basic">
                      {this.state && this.state.currency ? this.state.currency: 'Currency'}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className="dropdown-menu">
                      {Object.keys(this.state.currencyRates).map(each => {
                        return (
                          <Dropdown.Item
                            key={each}
                            
                            onClick={this.onClickHandler}
                          >
                            {each}
                          </Dropdown.Item>
                        );
                      })}
                    </Dropdown.Menu>
                  </Dropdown>
                ))
              )}
            </Col>
          </Row>
        </Container>
        {/* <nav className="navbar navbar-dark bg-dark mb-3">
            <a className="navbar-brand" href="#">
              <h1>Total Items <span className="badge badge-secondary">{this.props.totalItems}</span></h1>
            </a>
          </nav> */}
      </React.Fragment>
    );
  }
}

export default Items;
