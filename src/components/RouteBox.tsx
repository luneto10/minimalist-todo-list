import { useState } from "react";
import { Form, Button } from "react-bootstrap";

function MyForm() {
    const [path, setPath] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (path === "") return;
        window.location.pathname = `/${path}`;
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <Form.Group controlId="formBasicInput" className="flex-grow-1 me-2">
                <Form.Control
                    type="text"
                    placeholder="Start by typing your name"
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    className="my-2"
                />
            </Form.Group>
            <Button
                variant="outline-primary"
                type="submit"
                onClick={handleSubmit}
                className="custom-square-button"
            >
                Go
            </Button>
        </Form>
    );
}

export default MyForm;
