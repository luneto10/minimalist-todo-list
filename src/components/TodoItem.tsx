import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import styles from "../styles/TodoItem.module.css";
import { Todo } from "../types/types";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";
import ModalTextItem from "./ModalText";

interface TodoItemProps extends Todo {
    handleToggle: (id: string) => void;
    handleDelete: (id: string) => void;
    handleEdit?: (id: string, updatedText: string) => void; // Optional handleEdit
}

export default function TodoItem({
    id,
    text: todo,
    completed,
    handleToggle,
    handleDelete,
    handleEdit,
}: TodoItemProps) {
    const [showEditModal, setShowEditModal] = useState(false);

    const openEditModal = () => setShowEditModal(true);
    const closeEditModal = () => setShowEditModal(false);

    return (
        <>
            <li
                className={`d-flex align-items-center justify-content-between ${styles["item-box"]} p-2 rounded-2`}
            >
                <div className="d-flex align-items-center">
                    <input
                        className="form-check-input me-2 m-0"
                        type="checkbox"
                        id={`todo-${id}`}
                        checked={completed}
                        onChange={() => handleToggle(id)}
                    />
                    <label
                        className="form-check-label fs-5"
                        htmlFor={`todo-${id}`}
                    >
                        {completed ? <del>{todo}</del> : todo}
                    </label>
                </div>
                <div className="d-flex align-items-center">
                    <button
                        className={"btn border-0 " + styles["hover-glow"]}
                        onClick={openEditModal}
                    >
                        <EditIcon />
                    </button>
                    <button
                        className={"btn border-0 " + styles["hover-glow"]}
                        onClick={() => handleDelete(id)}
                    >
                        <DeleteOutlineIcon />
                    </button>
                </div>
            </li>

            {handleEdit && (
                <ModalTextItem
                    show={showEditModal}
                    handleClose={closeEditModal}
                    handleEdit={handleEdit}
                    todoText={todo}
                    todoId={id}
                    isEditing={true}
                />
            )}
        </>
    );
}
