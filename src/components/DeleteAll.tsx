import { Button, Modal } from "react-bootstrap";

interface DeleteAllProps {
    show: boolean;
    handleClose: () => void;
    handleDeleteAll: () => void;
    handleDeleteByUrl: (url: string) => void;
}

export default function DeleteAll({
    show,
    handleClose,
    handleDeleteAll,
    handleDeleteByUrl,
}: DeleteAllProps) {
    const handleConfirmDeleteAll = (e: React.FormEvent) => {
        e.preventDefault();
        handleDeleteAll();
        handleClose();
    };

    const handleConfirmDelete = (e: React.FormEvent) => {
        const url = window.location.pathname;
        e.preventDefault();
        handleDeleteByUrl(url);
        handleClose();
    };
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Delete All</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                Are you sure you want to delete all your items?
            </Modal.Body>
            <Modal.Footer className="d-flex justify-content-between">
                <Button variant="outline-secondary" onClick={handleClose}>
                    Cancel
                </Button>
                <div>
                    <Button variant="outline-danger" onClick={handleConfirmDeleteAll} className="me-2">
                        For Everyone
                    </Button>
                    <Button variant="outline-danger" onClick={handleConfirmDelete}>
                        For Me
                    </Button>
                </div>
            </Modal.Footer>
        </Modal>
    );
}
