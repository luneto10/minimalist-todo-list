import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import axios from "axios";
import { Todo } from "./types/types";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        getAll();
    }, []);

    const getAll = () => {
        axios
            .get("/api/Task")
            .then((response) => setTodos(response.data))
            .catch((error) => console.error("Error fetching data:", error));
    };

    const handleToggle = (id: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        axios
            .put(`/api/Task/${id}`, {
                ...todo,
                completed: !todo.completed,
            })
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id
                            ? { ...todo, completed: !todo.completed }
                            : todo
                    )
                );
            })
            .catch((error) => console.error("Error toggling todo:", error));
    };

    const handleDelete = (id: string) => {
        axios
            .delete(`/api/Task/${id}`)
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.id !== id)
                );
            })
            .catch((error) => console.error("Error deleting todo:", error));
    };

    const handleAdd = (todoText: string) => {
        axios
            .post("/api/Task", {
                text: todoText,
                completed: false,
            })
            .then((response) => {
                setTodos((prevTodos) => [...prevTodos, response.data]);
            })
            .catch((error) => console.error("Error adding todo:", error));
    };

    const handleDeleteAll = () => {
        axios
            .delete("/api/Task")
            .then(() => {
                setTodos([]);
            })
            .catch((error) =>
                console.error("Error deleting all todos:", error)
            );
    };

    const handleEdit = (id: string, updatedText: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        axios
            .put(`/api/Task/${id}`, {
                ...todo,
                text: updatedText,
            })
            .then(() => {
                console.log("Todo edited successfully");
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, text: updatedText } : todo
                    )
                );
            })
            .catch((error) => console.error("Error editing todo:", error));
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            <TodoList
                todos={todos}
                handleToggle={handleToggle}
                handleDelete={handleDelete}
                handleAdd={handleAdd}
                handleDeleteAll={handleDeleteAll}
                handleEdit={handleEdit}
            />
        </div>
    );
}

export default App;
