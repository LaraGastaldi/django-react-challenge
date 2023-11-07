import {Button, Modal} from "react-bootstrap";
import apiService from "../services/api.service";

function ConfirmDeleteCompanyModal (props: any) {
    if (!props.company) return <></>
    const handleDel = async () => {
        await apiService.deleteCompany(props.company.id);
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
                <p>Tem certeza que deseja excluir a empresa {props.company.name}?</p>
                <p>Isso irá excluir todos os funcionários também.</p>

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>Cancelar</Button>
                <Button variant="danger" onClick={handleDel}>Excluir</Button>
            </Modal.Footer>

        </Modal>
    )
}

export default ConfirmDeleteCompanyModal;