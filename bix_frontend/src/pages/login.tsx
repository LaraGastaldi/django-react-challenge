import {Component, FormEvent} from "react";
import {Button, Card, Col, Container, Form, FormLabel, FormText, InputGroup, Navbar, Row} from "react-bootstrap";
import {AbstractControl, FieldControl, FieldGroup, FormBuilder, FormControl} from 'react-reactive-form';
import apiService from "../services/api.service";

export default class Login extends Component {

    form = FormBuilder.group({
        username: "",
        password: ""
    })
    componentDidMount() {
        localStorage.removeItem('token');
    }

    handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (await apiService.login(this.form.value.username, this.form.value.password)) {
            window.location.href = '/';
        } else {
            alert('Login inválido');
        }
    };

    render() {
        return <>
            <Navbar className="bg-body-tertiary mb-5">
                <Container>
                    <Navbar.Brand>Admin Page</Navbar.Brand>
                </Container>
            </Navbar>
            <Container>
                <Row className={'justify-content-md-center'}>
                    <Col xs={12} lg={6} md={8}>
                        <Card>
                            <Card.Body>
                                <h2>Entrar</h2>
                                <FieldGroup control={this.form} render={(control) =>
                                    <Form noValidate onSubmit={this.handleSubmit}>
                                        <FieldControl name="username" render={(control) =>
                                            <Form.Group {...control.handler()} className="mb-3" controlId="formUsername">
                                                <Form.Label>Nome de usuário</Form.Label>
                                                <Form.Control required type="text" placeholder="Usuário" />
                                            </Form.Group>
                                        } />
                                        <FieldControl name="password" render={(control) =>
                                        <Form.Group {...control.handler()} className="mb-3" controlId="formPassword">
                                            <Form.Label>Senha</Form.Label>
                                            <Form.Control required type="password" placeholder="Senha" />
                                        </Form.Group>
                                    } />
                                        <Button variant="primary" type="submit">
                                            Enviar
                                        </Button>
                                    </Form>
                                } />
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>;
    }

}