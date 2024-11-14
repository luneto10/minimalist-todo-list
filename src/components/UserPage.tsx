import { useLocation } from "react-router-dom";

function UserPage() {
    const location = useLocation();
    
    const userPath = location.pathname.substring(1); // Remove a primeira barra "/"

    return (
        <div>
            <h1>Bem-vindo, {userPath}!</h1>
            <p>Esta é a página do usuário com caminho: {userPath}</p>
        </div>
    );
}

export default UserPage;
