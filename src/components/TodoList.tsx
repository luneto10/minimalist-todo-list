import TodoItem from "./TodoItem";
import { Todo } from "../types/types";
import styles from "../styles/TodoList.module.css";
import { useState } from "react";
import ModalTextItem from "./ModalText";
import AddBoxIcon from "@mui/icons-material/AddBox";
import DeleteAll from "./DeleteAll";
import { Button } from "react-bootstrap";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";
import "../styles/CustomScrollBar.css";

interface TodoListProps {
    todos: Todo[];
    handleToggle: (id: string) => void;
    handleDelete: (id: string) => void;
    handleDeleteAll: () => void;
    handleAdd: (todoText: string) => void;
    handleEdit: (id: string, updatedText: string) => void;
    handleDeleteByUrl: (url: string) => void;
}

export default function TodoList({
    todos,
    handleToggle,
    handleDelete,
    handleAdd,
    handleDeleteAll,
    handleEdit,
    handleDeleteByUrl,
}: TodoListProps) {
    const [showItemModal, setShowModal] = useState(false);
    const openItemModal = () => setShowModal(true);
    const closeItemModal = () => setShowModal(false);

    const [showConfirmDeleteModal, setShowConfirmDeleteModal] = useState(false);
    const openConfirmDeleteModal = () => setShowConfirmDeleteModal(true);
    const closeConfirmDeleteModal = () => setShowConfirmDeleteModal(false);
    return (
        <div
            className="container-fluid d-flex justify-content-center align-items-center"
            style={{ maxHeight: "90vh" }}
        >
            <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                <div className="d-flex flex-column justify-content-center align-items-center">
                    <div className="row justify-content-between align-items-center w-100 p-3 border-bottom border-dark">
                        <p className="h1 m-0 col-12 col-md-6 text-center text-md-start">
                            Todo List
                        </p>

                        <div className="col-12 col-md-6 d-flex justify-content-center justify-content-md-end">
                            <button
                                className={`btn border-0 p-0 pe-1 ${styles["hover-glow"]}`}
                                onClick={openItemModal}
                            >
                                <AddBoxIcon color="inherit" fontSize="large" />
                            </button>
                            <Button
                                variant={
                                    todos.length === 0
                                        ? "outline-secondary"
                                        : "outline-danger"
                                }
                                disabled={todos.length === 0}
                                size="sm"
                                onClick={openConfirmDeleteModal}
                                className="ms-2"
                            >
                                Delete All
                            </Button>
                        </div>
                    </div>

                    <SimpleBar
                        style={{ maxHeight: "70vh", margin: "0 1rem" }}
                        className="w-100"
                    >
                        <div className={`${styles["itemList"]}`}>
                            {todos.length === 0 ? (
                                <p className="text-center m-0 border-top">
                                    No todos yet! Click the + button to add one
                                </p>
                            ) : (
                                <ul className="list-group border-top">
                                    {todos.map((todo) => (
                                        <TodoItem
                                            key={todo.id}
                                            {...todo}
                                            handleToggle={handleToggle}
                                            handleDelete={handleDelete}
                                            handleEdit={handleEdit}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </SimpleBar>

                    <ModalTextItem
                        show={showItemModal}
                        handleClose={closeItemModal}
                        handleAdd={handleAdd}
                    />

                    <DeleteAll
                        show={showConfirmDeleteModal}
                        handleClose={closeConfirmDeleteModal}
                        handleDeleteAll={handleDeleteAll}
                        handleDeleteByUrl={handleDeleteByUrl}
                    />
                </div>
            </div>
        </div>
    );
}
