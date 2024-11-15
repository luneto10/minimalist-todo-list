import { useState } from "react";
import { Form, Button } from "react-bootstrap";
import "../styles/RouteBox.css";

interface RouteBoxProps {
    placeholder: string;
    size?: "sm" | "lg";
    background?: string;
}


function MyForm({ placeholder, size = "sm", background = "white" }: RouteBoxProps) {
    const [path, setPath] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (path === "") return;
        window.location.pathname = `/${path}`;
    };

    return (
        <Form onSubmit={handleSubmit} className="d-flex align-items-center">
            <Form.Group controlId="formBasicInput" className="mx-2 text-muted border">
                <Form.Control
                    type="text"
                    placeholder={placeholder}
                    value={path}
                    onChange={(e) => setPath(e.target.value)}
                    size={size} 
                    style={{ backgroundColor: background}}
                    className="custom-placeholder"
                />
            </Form.Group>
            <Button
                variant="outline-primary"
                type="submit"
                onClick={handleSubmit}
                className="custom-square-button"
                size={size}
            >
                Go
            </Button>
        </Form>
    );
}

export default MyForm;
