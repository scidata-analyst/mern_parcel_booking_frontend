import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function Profile() {
    const user = {
        name: "John Doe",
        email: "john@example.com",
        phone: "+880123456789",
        password: "********",
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">👤 User Details</div>
                        <div className="card-body">
                            <Link to="/" className="btn btn-secondary mb-4">
                                <i className="bi bi-arrow-left me-1"></i> Back to Dashboard
                            </Link>

                            <div className="row g-4">
                                <div className="col-md-6">
                                    <div className="border rounded p-3 bg-light">
                                        <strong>👤 Name:</strong>
                                        <div>{user.name}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="border rounded p-3 bg-light">
                                        <strong>📧 Email:</strong>
                                        <div>{user.email}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="border rounded p-3 bg-light">
                                        <strong>📱 Phone:</strong>
                                        <div>{user.phone}</div>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="border rounded p-3 bg-light">
                                        <strong>🔒 Password:</strong>
                                        <div>{user.password}</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default Profile;
