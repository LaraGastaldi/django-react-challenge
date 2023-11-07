import {Button, Form, Modal} from "react-bootstrap";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import {FormEvent} from "react";
import apiService from "../services/api.service";

function NewEmployeeModal(props: any) {

    const form = FormBuilder.group({
        username: [
            "",
            [Validators.required]
        ],
        name: [
            "",
            [Validators.required]
        ],
        password: [
            "",
            [Validators.required]
        ],
        email: [
            "",
            [Validators.required, Validators.email]
        ],
        company_id: [
            "",
            [Validators.required]
        ]
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        if (!form.valid || !form.dirty) {
            alert('Formulário inválido');
            return;
        }

        await apiService.createEmployee(form.value);
        props.onHide(true);
    }

    return (
        <Modal
            show={props.show}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header>
                <Modal.Title id="contained-modal-title-vcenter">
                    Novo funcionário
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
                        <FieldControl name="company_id" render={(control) =>
                            <Form.Group className="mb-3" controlId="formCompanyId">
                                <Form.Label>Empresa</Form.Label>
                                <Form.Select {...control.handler()}>
                                    <option value="" disabled>Selecione uma opção</option>
                                    {props.companies.map((company: any) =>
                                        <option key={company.id} value={company.id}>{company.name}</option>
                                    )}
                                </Form.Select>
                            </Form.Group>
                        } />
                        <Button variant="primary" type="submit">
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

export default NewEmployeeModal;