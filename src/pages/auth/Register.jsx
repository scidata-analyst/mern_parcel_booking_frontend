import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [role, setRole] = useState("user");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();


    useEffect(() => {
        const user = localStorage.getItem("user");
        if (user) {
            navigate("/");
        }
    }, [navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError("");
        setSuccess("");

        const userData = {
            name,
            email,
            phone,
            role,
            password
        };

        axios
            .post(`${import.meta.env.VITE_API_URL}/api/user/add`, userData)
            .then((response) => {
                setRole(response.data.role);
                setSuccess("User registered successfully. You can now login.");
            })
            .catch((error) => {
                setError(error.response?.data?.message || "An error occurred while adding the user.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card shadow-lg p-4" style={{ width: "100%", maxWidth: "500px" }}>
                <div className="text-center mb-4">
                    <h2 className="fw-bold">Register</h2>
                    <p className="text-muted">Create a new account</p>
                </div>

                {success && (
                    <div className="alert alert-success text-center">{success}</div>
                )}
                {error && (
                    <div className="alert alert-warning text-center">{error}</div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="John Doe"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="phone" className="form-label">Phone Number</label>
                        <input
                            type="tel"
                            className="form-control"
                            id="phone"
                            placeholder="0123456789"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email Address</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            placeholder="kanchon@gmail.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            placeholder="********"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    {loading ? (
                        <div className="d-flex justify-content-center mb-3">
                            <div className="spinner-border text-primary" role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <button type="submit" className="btn btn-primary w-100">Register</button>
                    )}
                </form>

                <div className="text-center mt-3">
                    <small className="text-muted">Already have an account? <a href="/login">Login</a></small>
                </div>
            </div>
        </div>
    );
}

export default Register;
