import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function ParcelHistory() {
    const [parcels, setParcels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const token = localStorage.getItem("token");

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
                setParcels(data);
                setError("");
                console.log(data);
            })
            .catch((err) => {
                setError(err.message || "Something went wrong");
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const statusBadge = (status) => {
        switch (status) {
            case "Delivered":
                return <span className="badge bg-success">{status}</span>;
            case "In Transit":
                return <span className="badge bg-warning text-dark">{status}</span>;
            case "Pending":
                return <span className="badge bg-secondary">{status}</span>;
            default:
                return <span className="badge bg-light text-dark">{status || "Unknown"}</span>;
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
                            📜 Parcel Booking History
                        </div>
                        <div className="card-body">
                            {loading ? (
                                <div className="text-center">
                                    <div className="spinner-border text-primary" role="status"></div>
                                </div>
                            ) : error ? (
                                <div className="alert alert-danger">{error}</div>
                            ) : parcels.length === 0 ? (
                                <div className="alert alert-info">No parcels found.</div>
                            ) : (
                                <div className="table-responsive">
                                    <table className="table table-bordered align-middle">
                                        <thead className="table-light">
                                            <tr>
                                                <th>📦 ID</th>
                                                <th>🚚 Pickup</th>
                                                <th>📬 Delivery</th>
                                                <th>📏 Type</th>
                                                <th>💰 Payment</th>
                                                <th>📅 Date</th>
                                                <th>📌 Status</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {parcels.map((parcel) => (
                                                <tr key={parcel._id}>
                                                    <td>{parcel._id}</td>
                                                    <td>{parcel.pickup_address}</td>
                                                    <td>{parcel.delivery_address}</td>
                                                    <td>{parcel.parcel_size}</td>
                                                    <td>{parcel.payment_method}</td>
                                                    <td>10-05-2025</td>
                                                    <td>{statusBadge(parcel.status)}</td>
                                                </tr>
                                            ))}
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

export default ParcelHistory;
