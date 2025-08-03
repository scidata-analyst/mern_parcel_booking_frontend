import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { useState, useEffect } from "react";

function UserList() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const token = localStorage.getItem("token");

    useEffect(() => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/api/user/all`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => setUsers(data))
            .catch((error) => console.error("Error fetching users:", error))
            .finally(() => setLoading(false));
    }, [token]);

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0">
                        <div className="card-header bg-white fw-bold d-flex justify-content-between align-items-center">
                            <span>👥 User List</span>
                            <Link to="/create-user" className="btn btn-primary btn-sm">
                                <i className="bi bi-plus-circle me-1"></i> Create Agent
                            </Link>
                        </div>

                        <div className="card-body">
                            {loading ? (
                                <div className="text-center py-4">
                                    <div className="spinner-border text-primary" role="status" aria-label="Loading users">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-hover align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>#</th>
                                                <th>👤 Name</th>
                                                <th>📧 Email</th>
                                                <th>📱 Phone</th>
                                                <th className="text-end">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {users.length > 0 ? (
                                                users.map((user, index) => (
                                                    <tr key={user._id}>
                                                        <td>{index + 1}</td>
                                                        <td>{user.name}</td>
                                                        <td>{user.email}</td>
                                                        <td>{user.phone}</td>
                                                        <td className="text-end">
                                                            <Link
                                                                to={`/profile/${user._id}`}
                                                                className="btn btn-sm btn-info me-2"
                                                            >
                                                                <i className="bi bi-eye"></i>
                                                            </Link>
                                                            <Link
                                                                to={`/edit-details/${user._id}`}
                                                                className="btn btn-sm btn-warning me-2"
                                                            >
                                                                <i className="bi bi-pencil-square"></i>
                                                            </Link>
                                                        </td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan="5" className="text-center text-muted">
                                                        No users found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserList;
