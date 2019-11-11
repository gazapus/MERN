import React from 'react'
import { Form, FormGroup, Label, Input, Row, Col } from 'reactstrap';

class filterForm extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            elementFilter: ""
        }
    }

    handleChange = (e) => {
        this.setState({
            elementFilter: e.target.value
        });
        //Ejecuta el cambio en el componenete contenedor
        this.props.onChange(e.target.value)
    }

    render() {
        return (
            <Row>
                <Col md={6}>
                <Form>
                    <FormGroup>
                        <Label for="filter">Filter cities</Label>
                        <Input type="text" id="filter"
                            value={this.state.elementFilter}
                            onChange={this.handleChange}
                            placeholder="city or country name" />
                    </FormGroup>
                </Form>
                </Col>
            </Row>
        )
    }
}

export default filterForm