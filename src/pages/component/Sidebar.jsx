import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    useEffect(() => {
        const user = localStorage.getItem("user");
        if (!user) {
            navigate("/login");
        }
    }, [navigate]);

    return (
        <>
            <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
                <div className="position-sticky pt-3">
                    <h1 className="text-center mt-3 pb-3 border-bottom">Admin Panel</h1>
                    <ul className="nav flex-column mt-4">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/`}>
                                👤 Dashboard
                            </Link>
                        </li>
                        <li className="nav-item mt-4">
                            <button
                                className="btn btn-outline-danger w-100"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    navigate("/login");
                                }}
                            >
                                🚪 Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;