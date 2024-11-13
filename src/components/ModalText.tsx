import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface AddTodoModalProps {
    show: boolean;
    handleClose: () => void;
    handleAdd?: (todoText: string) => void;
    handleEdit?: (id: string, updatedText: string) => void;
    todoText?: string;
    todoId?: string;
    isEditing?: boolean;
}

export default function ModalTextItem({
    show,
    handleClose,
    handleAdd = () => {},
    handleEdit = () => {},
    todoText = "",
    todoId = "",
    isEditing = false,
}: AddTodoModalProps) {
    const [text, setText] = useState(todoText);

    useEffect(() => {
        setText(todoText); // Update state when todoText changes
    }, [todoText]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEditing && handleEdit) {
            handleEdit(todoId, text);
        } else {
            handleAdd(text);
        }
        setText("");
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>
                    {isEditing ? "Edit Todo" : "Add New Todo"}
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formTodoText">
                        <Form.Label>What do you want to do?</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter todo"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit" className="mt-3">
                        {isEditing ? "Save Changes" : "Add Todo"}
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
}
