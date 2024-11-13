import { Button, Modal } from "react-bootstrap";

interface DeleteAllProps {
    show: boolean;
    handleClose: () => void;
    handleDeleteAll: () => void;
}

export default function DeleteAll({
    show,
    handleClose,
    handleDeleteAll,
}: DeleteAllProps) {
    const handleConfirm = (e: React.FormEvent) => {
        e.preventDefault();
        handleDeleteAll();
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete All</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete all items?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <Button variant="outline-danger" onClick={handleConfirm}>
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}
