import {Button, Form, Modal} from "react-bootstrap";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import apiService from "../services/api.service";
import {FormEvent} from "react";

function EditEmployeeModal(props: any) {

    if (!props.employee) return <></>
    const form = FormBuilder.group({
        name: props.employee.name,
        username: props.employee.username,
        email: props.employee.email,
        password: ""
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const toSend = form.value;
        if (form.value.password === "") {
            delete toSend.password;
        }
        await apiService.updateEmployee(props.employee.id, toSend);

        props.onHide(true);
    };
    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Editar funcionário
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FieldGroup control={form} render={(control) =>
                    <Form noValidate onSubmit={handleSubmit}>
                        <FieldControl name="username" render={(control) =>
                            <Form.Group className="mb-3" controlId="username">
                                <Form.Label>Nome de usuário</Form.Label>
                                <Form.Control type="text" {...control.handler()} />
                            </Form.Group>
                        } />
                        <FieldControl name="name" render={(control) =>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control type="text" {...control.handler()} />
                            </Form.Group>
                        } />
                        <FieldControl name="email" render={(control) =>
                            <Form.Group className="mb-3" controlId="formEmail">
                                <Form.Label>E-mail</Form.Label>
                                <Form.Control type="email" {...control.handler()} />
                            </Form.Group>
                        } />
                        <FieldControl name="password" render={(control) =>
                            <Form.Group className="mb-3" controlId="formPassword">
                                <Form.Label>Senha</Form.Label>
                                <Form.Control type="password" {...control.handler()} placeholder="*****" />
                            </Form.Group>
                        } />
                        <Button disabled={!form.dirty} variant="primary" type="submit">
                            Enviar
                        </Button>
                    </Form>
                } />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Close</Button>
            </Modal.Footer>
        </Modal>
    )
}

export default EditEmployeeModal;