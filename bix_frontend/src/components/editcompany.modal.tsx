import {Button, Form, Modal} from "react-bootstrap";
import {FieldControl, FieldGroup, FormBuilder, Validators} from "react-reactive-form";
import apiService from "../services/api.service";
import {FormEvent} from "react";

function EditCompanyModal(props: any) {

    if (!props.company) return <></>
    const form = FormBuilder.group({
        name: props.company.name
    });

    const handleSubmit = async (event: FormEvent) => {
        event.preventDefault();
        const toSend = form.value;
        await apiService.updateCompany(props.company.id, toSend);

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
                    Editar Empresa
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <FieldGroup control={form} render={(control) =>
                    <Form noValidate onSubmit={handleSubmit}>
                        <FieldControl name="name" render={(control) =>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Nome Completo</Form.Label>
                                <Form.Control type="text" {...control.handler()} />
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

export default EditCompanyModal;