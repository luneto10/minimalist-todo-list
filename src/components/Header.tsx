import HomeIcon from "@mui/icons-material/Home";

export default function Header() {
    return (
        <button
            className={`btn border-0 p-0 pe-1`}
            onClick={() => (window.location.pathname = "/")}
        >
            <HomeIcon
                style={{ textDecoration: "none", color: "inherit" }}
                onClick={() => (window.location.pathname = "/")}
            />
        </button>
    );
}
