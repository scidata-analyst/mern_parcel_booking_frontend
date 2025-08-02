import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function EditDetails() {
    const { id } = useParams();
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const token = localStorage.getItem("token");
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    /* Fetch user details */
    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/user/profile/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setLoading(false);
                setUser(data);
            })
            .catch((error) => {
                console.error("Error fetching user details:", error);
                setLoading(false);
            });
    }, [id]);

    /* Update user profile */
    const updateProfile = (e) => {
        e.preventDefault();
        setSaving(true);

        const userData = {
            name: user.name,
            email: user.email,
            phone: user.phone,
            role: user.role,
            password: user.password,
        };

        fetch(`${import.meta.env.VITE_API_URL}/api/user/update-profile/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(userData),
        })
            .then((res) => res.json())
            .then(() => {
                setSuccessMessage("Profile updated successfully.");
                setErrorMessage("");
            })
            .catch((error) => {
                setErrorMessage("Error updating profile.");
                console.error(error);
            })
            .finally(() => {
                setSaving(false);
            });
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">👤 Edit User Details</div>
                        <div className="card-body">
                            <Link to="/" className="btn btn-primary">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Messages */}
                    <div className="row">
                        {successMessage && (
                            <div className="col-md-12">
                                <div className="alert alert-success" role="alert">
                                    {successMessage}
                                </div>
                            </div>
                        )}
                        {errorMessage && (
                            <div className="col-md-12">
                                <div className="alert alert-danger" role="alert">
                                    {errorMessage}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Form */}
                    <form className="row g-4" onSubmit={updateProfile}>
                        {loading ? (
                            <div className="d-flex justify-content-center mb-3">
                                <div className="spinner-border text-primary" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        ) : (
                            <>
                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="userName"
                                            placeholder="Full Name"
                                            value={user.name || ""}
                                            onChange={(e) => setUser({ ...user, name: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="userName">👤 Full Name</label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="email"
                                            className="form-control"
                                            id="userEmail"
                                            placeholder="Email"
                                            value={user.email || ""}
                                            onChange={(e) => setUser({ ...user, email: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="userEmail">📧 Email Address</label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <input
                                            type="tel"
                                            className="form-control"
                                            id="userPhone"
                                            placeholder="Phone"
                                            value={user.phone || ""}
                                            onChange={(e) => setUser({ ...user, phone: e.target.value })}
                                            required
                                        />
                                        <label htmlFor="userPhone">📱 Phone Number</label>
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <div className="form-floating">
                                        <select
                                            className="form-select"
                                            id="userRole"
                                            value={user.role || ""}
                                            onChange={(e) => setUser({ ...user, role: e.target.value })}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            <option value="admin">Admin</option>
                                            <option value="agent">Agent</option>
                                            <option value="user">User</option>
                                        </select>
                                        <label htmlFor="userRole">👔 Role</label>
                                    </div>
                                </div>

                                <div className="col-12">
                                    <button type="submit" className="btn btn-success" disabled={saving}>
                                        {saving ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2" role="status" />
                                                Saving...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-save me-1"></i> Save Changes
                                            </>
                                        )}
                                    </button>
                                </div>
                            </>
                        )}
                    </form>
                </main>
            </div>
        </div>
    );
}

export default EditDetails;
