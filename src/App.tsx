import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import axios from "axios";
import { Todo } from "./types/types";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        const pathSegments = window.location.pathname.substring(1);
        getAll(pathSegments);
    }, []);

    const getAll = (url: string) => {
        const encodedUrl = encodeURIComponent(url);
        console.log(encodedUrl);
        axios
            .get(`${apiBaseUrl}/Task/${encodedUrl}`)
            .then((response) => {
                setTodos(response.data);
            })
            .catch((error) => console.error("Erro ao buscar dados:", error));
    };

    const handleToggle = (id: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        axios
            .put(`${apiBaseUrl}/Task/${id}`, {
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
            .catch((error) => console.error("Erro ao alternar tarefa:", error));
    };

    const handleDelete = (id: string) => {
        axios
            .delete(`${apiBaseUrl}/Task/${id}`)
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.id !== id)
                );
            })
            .catch((error) => console.error("Erro ao deletar tarefa:", error));
    };

    const handleAdd = (todoText: string) => {
        const pathSegments = window.location.pathname.substring(1);
        axios
            .post(`${apiBaseUrl}/Task`, {
                text: todoText,
                url: pathSegments,
                completed: false,
            })
            .then((response) => {
                setTodos((prevTodos) => [...prevTodos, response.data]);
            })
            .catch((error) =>
                console.error("Erro ao adicionar tarefa:", error)
            );
    };

    const handleDeleteByUrl = () => {
        const pathSegments = window.location.pathname.substring(1);
        const encodedUrl = encodeURIComponent(pathSegments);
        axios
            .delete(`${apiBaseUrl}/Task/by-url/${encodedUrl}`)
            .then(() => {
                setTodos([]);
            })
            .catch((error) =>
                console.error("Erro ao deletar tarefas por URL:", error)
            );
    };

    const handleDeleteAll = () => {
        axios
            .delete(`${apiBaseUrl}/Task`)
            .then(() => {
                setTodos([]);
            })
            .catch((error) =>
                console.error("Erro ao deletar todas as tarefas:", error)
            );
    };

    const handleEdit = (id: string, updatedText: string) => {
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;

        axios
            .put(`${apiBaseUrl}/Task/${id}`, {
                ...todo,
                text: updatedText,
            })
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.map((todo) =>
                        todo.id === id ? { ...todo, text: updatedText } : todo
                    )
                );
            })
            .catch((error) => console.error("Erro ao editar tarefa:", error));
    };

    return (
        <div className="d-flex flex-column justify-content-center align-items-center vh-100">
            {window.location.pathname !== "/" ? (
                <TodoList
                    todos={todos}
                    handleToggle={handleToggle}
                    handleDelete={handleDelete}
                    handleAdd={handleAdd}
                    handleDeleteAll={handleDeleteAll}
                    handleEdit={handleEdit}
                    handleDeleteByUrl={handleDeleteByUrl}
                />
            ) : (
                <div className="text-center">
                    <h1 className="display-4 text-secondary mb-4">Welcome to the Todo App!</h1>
                    <p className="lead">Add any text to the end of the URL to start a personalized Todo list.</p>
                    <p>For example: <code>https://minimalist-todo-list.vercel.app/your-name</code></p>
                </div>
            )}
        </div>
    );
}

export default App;
