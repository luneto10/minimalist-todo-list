import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import axios from "axios";
import { Todo } from "./types/types";
import RouteBox from "./components/RouteBox";
import Header from "./components/Header";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [userIp, setUserIp] = useState("");

    const apiBaseUrl = import.meta.env.VITE_API_BASE_URL;

    useEffect(() => {
        // Fetch the user's IP address on initial load
        axios
            .get("https://api.ipify.org?format=json")
            .then((response) => {
                setUserIp(response.data.ip);
            })
            .catch((error) => {
                console.error("Error fetching IP address:", error);
            });

        // Get todos based on the URL path
        const pathSegments = window.location.pathname.substring(1);
        getAll(pathSegments);
    }, []);

    const getAll = (url: string) => {
        const encodedUrl = encodeURIComponent(url);
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
                createdAt: new Date().toISOString(),
                userIP: userIp,
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
        <div className="container-fluid d-flex flex-column justify-content-center align-items-center container-safe">
            {/* Header */}
            <div className="w-100 position-fixed top-0 start-0 m-3">
                <Header />
            </div>

            {/* Main Content */}
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
                    <h1 className="display-1 mb-0 mx-1">
                        Taskr
                        <p className="lead text-muted mt-0 mb-3 mx-1">
                            A collaborative and real-time task manager.
                        </p>
                    </h1>

                    {/* URL Input for Larger Screens */}
                    <div className="d-flex mx-1 d-none d-lg-block">
                        <small>Start by:</small>{" "}
                        <code className="d-flex font-weight-bold align-items-center">
                            https://minimalist-todo-list-weld.vercel.app/
                            <RouteBox
                                placeholder="..."
                                size="sm"
                                background="#efefef"
                            />
                        </code>
                    </div>

                    {/* URL Input for Smaller Screens */}
                    <div className="d-flex flex-column align-items-center justify-content-center d-lg-none">
                        <code className="font-weight-bold align-items-center">
                            https://minimalist-todo-list-weld.vercel.app/
                        </code>
                        <RouteBox placeholder="..." background="#efefef" />
                    </div>

                    {/* Footer */}
                    <p className="footer-safe text-muted mb-3 small small-md w-100 text-center">
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
