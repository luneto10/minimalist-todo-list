import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import axios from "axios";
import { Todo } from "./types/types";
import RouteBox from "./components/RouteBox";
import Header from "./components/Header";

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
            <div className="w-100 position-fixed top-0 start-0 m-3">
                <Header />
            </div>
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
                <div className="text-center my-5">
                    <h1 className="display-4 mb-4 mx-1">
                        Welcome to the Todo App!
                    </h1>
                    <p className="lead text-muted mb-3 mx-1 d-none d-lg-block">
                        Add any text to the end of the URL to start your own
                        list.
                    </p>
                    <p className="lead text-muted mb-3 mx-1 d-lg-none">
                        Add any text to the field, click go and start a list.
                    </p>
                    <p className="mx-1 d-none d-lg-block">
                        <small>Start by:</small>{" "}
                        <code className="font-weight-bold">
                            https://minimalist-todo-list.vercel.app/
                            {"{your-name}"}
                        </code>
                    </p>

                    <div className="d-flex justify-content-center d-lg-none">
                        <RouteBox />
                    </div>

                    <p className="position-absolute bottom-0 start-50 translate-middle-x text-muted mb-3 small small-md">
                        <span className="d-none d-md-inline">
                            This is a simple todo app where you can create and
                            manage your tasks. However, one person can delete
                            all tasks...
                        </span>
                        <span className="d-inline d-md-none">
                            This is a simple todo app, but remember, anyone can
                            delete all...
                        </span>
                    </p>
                </div>
            )}
        </div>
    );
}

export default App;
