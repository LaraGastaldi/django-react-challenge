import {Button, Form, Modal} from "react-bootstrap";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import {FormEvent} from "react";
import apiService from "../services/api.service";

function NewCompanyModal(props: any) {

    const form = FormBuilder.group({
        name: [
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

        await apiService.createCompany(form.value);
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
                    Nova empresa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FieldGroup control={form} render={(control) =>
                    <Form noValidate onSubmit={handleSubmit}>
                        <FieldControl name="name" render={(control) =>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nome da empresa</Form.Label>
                                <Form.Control type="text" {...control.handler()} />
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

export default NewCompanyModal;