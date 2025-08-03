import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function AssignedParcels() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [showModal, setShowModal] = useState(false);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [formData, setFormData] = useState({
        parcel_id: "",
        user_id: "",
        status: "Pending",
        amount: "",
        delivery_date: "",
        assigned_date: "",
        latitude: "",
        longitude: "",
        sender: "",
        receiver: "",
    });

    const token = localStorage.getItem("token");
    const statusOptions = ["Pending", "Picked Up", "In Transit", "Delivered", "Failed"];

    useEffect(() => {
        fetch(`${import.meta.env.VITE_API_URL}/api/parcel/parcels`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Failed to fetch parcels");
                return res.json();
            })
            .then((data) => {
                console.log(data);
                setParcels(data);
                setError("");
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
            })
            .finally(() => setLoading(false));
    }, []);

    const statusBadge = (status) => {
        const badgeMap = {
            "Pending": "secondary",
            "Picked Up": "info",
            "In Transit": "warning text-dark",
            "Delivered": "success",
            "Failed": "danger",
        };
        return <span className={`badge bg-${badgeMap[status] || "light"}`}>{status}</span>;
    };

    const handleSubmit = async () => {
        try {
            console.log(formData);
            const response = await fetch(`${import.meta.env.VITE_API_URL}/api/parcelhistory/add`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error("Failed to save history");

            const result = await response.json();

            console.log(result);
            setShowModal(false);
        } catch (err) {
            alert(err.message || "Something went wrong");
        }
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">
                            🚚 Assigned Parcels & Status Update
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : parcels.length === 0 ? (
                                <div className="alert alert-info">No assigned parcels.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>📦 Parcel ID</th>
                                                <th>👤 Sender</th>
                                                <th>📨 Receiver</th>
                                                <th>🚚 Pickup</th>
                                                <th>📬 Delivery</th>
                                                <th>📅 Assigned</th>
                                                <th>📌 Status</th>
                                                <th className="text-center">🔄 Update</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parcels.map((parcel) => (
                                                <tr key={parcel._id}>
                                                    <td>{parcel._id}</td>
                                                    <td>{parcel.sender_name || "N/A"}</td>
                                                    <td>{parcel.receiver_name || "N/A"}</td>
                                                    <td>{parcel.pickup_address}</td>
                                                    <td>{parcel.delivery_address}</td>
                                                    <td>{new Date(parcel.createdAt).toLocaleDateString()}</td>
                                                    <td>{statusBadge(parcel.status)}</td>
                                                    <td className="text-center">
                                                        <button
                                                            className="btn btn-sm btn-outline-primary"
                                                            onClick={() => {
                                                                setSelectedParcel(parcel);
                                                                setFormData({
                                                                    parcel_id: parcel._id || "",
                                                                    user_id: parcel.user_details || "",
                                                                    status: "",
                                                                    amount: "",
                                                                    delivery_date: "",
                                                                    assigned_date: "",
                                                                    latitude: "",
                                                                    longitude: "",
                                                                    sender: "",
                                                                    receiver: "",
                                                                });
                                                                setShowModal(true);
                                                            }}
                                                        >
                                                            Assign Parcel
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Bootstrap Modal */}
                    {showModal && (
                        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "#66339970" }}>
                            <div className="modal-dialog modal-dialog-centered">
                                <div className="modal-content">
                                    <div className="modal-header">
                                        <h5 className="modal-title">Update Parcel Status</h5>
                                        <button
                                            type="button"
                                            className="btn-close"
                                            onClick={() => setShowModal(false)}
                                        ></button>
                                    </div>
                                    <div className="modal-body">
                                        <form>
                                            <div className="row">
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Parcel ID</label>
                                                    <input type="text" className="form-control" value={formData.parcel_id} readOnly />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Status</label>
                                                    <select
                                                        className="form-select"
                                                        value={formData.status}
                                                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                                                    >
                                                        {statusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">User ID</label>
                                                    <input type="text" className="form-control" value={formData.user_id} readOnly />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Sender</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.sender}
                                                        onChange={(e) => setFormData({ ...formData, sender: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Receiver</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.receiver}
                                                        onChange={(e) => setFormData({ ...formData, receiver: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Amount</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.amount}
                                                        onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Delivery Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={formData.delivery_date}
                                                        onChange={(e) => setFormData({ ...formData, delivery_date: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Assigned Date</label>
                                                    <input
                                                        type="date"
                                                        className="form-control"
                                                        value={formData.assigned_date}
                                                        onChange={(e) => setFormData({ ...formData, assigned_date: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Latitude</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.latitude}
                                                        onChange={(e) => setFormData({ ...formData, latitude: e.target.value })}
                                                    />
                                                </div>
                                                <div className="col-md-6 mb-2">
                                                    <label className="form-label">Longitude</label>
                                                    <input
                                                        type="text"
                                                        className="form-control"
                                                        value={formData.longitude}
                                                        onChange={(e) => setFormData({ ...formData, longitude: e.target.value })}
                                                    />
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div className="modal-footer">
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Close
                                        </button>
                                        <button className="btn btn-primary" onClick={handleSubmit}>
                                            Save Changes
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </main>
            </div>
        </div>
    );
}

export default AssignedParcels;
