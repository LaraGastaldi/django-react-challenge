import {Button, Modal} from "react-bootstrap";
import apiService from "../services/api.service";

function ConfirmdeleteemployeeModal (props: any) {
    if (!props.employee) return <></>
    const handleDel = async () => {
        await apiService.deleteEmployee(props.employee.id);
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
                    Excluir
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Tem certeza que deseja excluir {props.employee.name}?

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDel}>Excluir</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default ConfirmdeleteemployeeModal;