import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function CreateAgent() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "agent",
    });
    const [saving, setSaving] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const token = localStorage.getItem("token");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSaving(true);

        fetch(`${import.meta.env.VITE_API_URL}/api/user/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((res) => res.json())
            .then(() => {
                setSuccessMessage("Agent created successfully!");
                setErrorMessage("");
            })
            .catch((err) => {
                setErrorMessage(err);
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
                        <div className="card-header bg-white fw-bold">👤 New Agent</div>
                        <div className="card-body">
                            <Link to="/" className="btn btn-primary">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    {/* Feedback messages */}
                    {successMessage && (
                        <div className="alert alert-success">{successMessage}</div>
                    )}
                    {errorMessage && (
                        <div className="alert alert-danger">{errorMessage}</div>
                    )}

                    <form className="row g-4" onSubmit={handleSubmit}>
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="name"
                                    placeholder="Full Name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="name">👤 Full Name</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="email"
                                    className="form-control"
                                    id="email"
                                    placeholder="Email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="email">📧 Email Address</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="tel"
                                    className="form-control"
                                    id="phone"
                                    placeholder="Phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="phone">📱 Phone Number</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    placeholder="Password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="password">🔒 Password</label>
                            </div>
                        </div>

                        <div className="col-12">
                            <button
                                type="submit"
                                className="btn btn-success"
                                disabled={saving}
                            >
                                {saving ? (
                                    <>
                                        <span
                                            className="spinner-border spinner-border-sm me-2"
                                            role="status"
                                        ></span>
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-save me-1"></i> Save Changes
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default CreateAgent;
