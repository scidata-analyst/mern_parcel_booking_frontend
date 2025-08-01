import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function UserList() {
    const users = [
        {
            id: 1,
            name: "John Doe",
            email: "john@example.com",
            phone: "+880123456789",
        },
        {
            id: 2,
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+8801987654321",
        },
        {
            id: 3,
            name: "Rafiul Hasan",
            email: "rafi@example.com",
            phone: "+8801712345678",
        },
    ];

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
                                <i className="bi bi-plus-circle me-1"></i> Add User
                            </Link>
                        </div>

                        <div className="card-body">
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
                                        {users.map((user, index) => (
                                            <tr key={user.id}>
                                                <td>{index + 1}</td>
                                                <td>{user.name}</td>
                                                <td>{user.email}</td>
                                                <td>{user.phone}</td>
                                                <td className="text-end">
                                                    <Link
                                                        to={`/users/${user.id}`}
                                                        className="btn btn-sm btn-info me-2"
                                                    >
                                                        <i className="bi bi-eye"></i>
                                                    </Link>
                                                    <Link
                                                        to={`/users/${user.id}/edit`}
                                                        className="btn btn-sm btn-warning me-2"
                                                    >
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Link>
                                                    <button className="btn btn-sm btn-danger">
                                                        <i className="bi bi-trash"></i>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default UserList;
