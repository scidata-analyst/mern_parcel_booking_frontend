import { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function CreateParcel() {
    const [formData, setFormData] = useState({
        pickup_address: "",
        delivery_address: "",
        parcel_size: "",
        payment_method: ""
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

        fetch(`${import.meta.env.VITE_API_URL}/api/parcel/add`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(formData),
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to create parcel");
                return res.json();
            })
            .then(() => {
                setSuccessMessage("Parcel created successfully!");
                setErrorMessage("");
                setFormData({
                    pickup_address: "",
                    delivery_address: "",
                    parcel_size: "",
                    payment_method: ""
                });
            })
            .catch((err) => {
                setErrorMessage(err.message || "Something went wrong");
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
                        <div className="card-header bg-white fw-bold">📂 Create Parcel</div>
                        <div className="card-body">
                            <Link to="/parcel-history" className="btn btn-primary">
                                View Parcels
                            </Link>
                        </div>
                    </div>

                    {/* Feedback */}
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
                                    id="pickup_address"
                                    placeholder="123 Main St"
                                    value={formData.pickup_address}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="pickup_address">📍 Pickup Address</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input
                                    type="text"
                                    className="form-control"
                                    id="delivery_address"
                                    placeholder="456 Delivery St"
                                    value={formData.delivery_address}
                                    onChange={handleChange}
                                    required
                                />
                                <label htmlFor="delivery_address">📦 Delivery Address</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    id="parcel_size"
                                    value={formData.parcel_size}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Type</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                                <label htmlFor="parcel_size">📦 Parcel Size</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <select
                                    className="form-select"
                                    id="payment_method"
                                    value={formData.payment_method}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Select Payment Mode</option>
                                    <option value="cod">Cash on Delivery</option>
                                    <option value="prepaid">Prepaid</option>
                                </select>
                                <label htmlFor="payment_method">💳 Payment Method</label>
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
                                        Creating...
                                    </>
                                ) : (
                                    <>
                                        <i className="bi bi-plus-circle me-1"></i> Create Parcel
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

export default CreateParcel;
