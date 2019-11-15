import React from "react";
import { Form, FormGroup, Label, Input, Row, Col } from "reactstrap";
import "../styles/FilterForm.css";

class filterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elementFilter: ""
    };
  }

  handleChange = e => {
    this.setState({
      elementFilter: e.target.value
    });
    this.props.onChange(e.target.value);
  };

  render() {
    return (
      <Row>
        <Col md={6}>
          <Form>
            <FormGroup>
              <div id="inputContainer">
                <div id="labelFilter">
                  <Label for="filter">Filter our current cities</Label>
                </div>
                <Input
                  type="text"
                  id="filter"
                  value={this.state.elementFilter}
                  onChange={this.handleChange}
                  placeholder="city name"
                />
              </div>
            </FormGroup>
          </Form>
        </Col>
      </Row>
    );
  }
}

export default filterForm;
