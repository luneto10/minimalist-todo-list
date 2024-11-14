import { useEffect, useState } from "react";
import "./App.css";
import TodoList from "./components/TodoList";
import axios from "axios";
import { Todo } from "./types/types";

function App() {
    const [todos, setTodos] = useState<Todo[]>([]);

    useEffect(() => {
        const pathSegments = window.location.pathname;
        getAll(pathSegments);
    }, []);

    const getAll = (url: string) => {
        const encodedUrl = encodeURIComponent(url);
        console.log("Get" + url);
        console.log((`/api/Task/${encodedUrl}`))
        axios
            .get(`https://minimaltodolistapi.azurewebsites.net/api/task`)
            .then((response) => {
                
                setTodos(response.data)
            })
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
        const pathSegments = window.location.pathname;
        axios
            .post("/api/Task", {
                text: todoText,
                url: pathSegments,
                completed: false,
            })
            .then((response) => {
                setTodos((prevTodos) => [...prevTodos, response.data]);
            })
            .catch((error) => console.error("Error adding todo:", error));
    };

    const handleDeleteByUrl = (url: string) => {
        const encodedUrl = encodeURIComponent(url);
        console.log(url);
        axios
            .delete(`/api/Task/by-url/${encodedUrl}`)
            .then(() => {
                setTodos((prevTodos) =>
                    prevTodos.filter((todo) => todo.url !== url)
                );
            })
            .catch((error) => console.error("Error deleting todo:", error));
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
                const currentUrl = window.location.href;
                console.log(currentUrl);
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
                handleDeleteByUrl={handleDeleteByUrl}
            />
        </div>
    );
}

export default App;
