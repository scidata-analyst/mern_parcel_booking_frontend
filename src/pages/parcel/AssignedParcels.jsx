import { useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function AssignedParcels() {
    const [parcels, setParcels] = useState([
        {
            id: "P1001",
            sender: "Arif Hossain",
            receiver: "Sadia Rahman",
            pickup: "Banani, Dhaka",
            delivery: "Chittagong City",
            status: "Picked Up",
            assignedDate: "2025-07-30",
        },
        {
            id: "P1002",
            sender: "Khalid Uddin",
            receiver: "Mithila Akter",
            pickup: "Uttara, Dhaka",
            delivery: "Rajshahi Town",
            status: "Pending",
            assignedDate: "2025-07-31",
        },
        {
            id: "P1003",
            sender: "Anika Ferdous",
            receiver: "Hasan Kabir",
            pickup: "Dhanmondi, Dhaka",
            delivery: "Sylhet Sadar",
            status: "In Transit",
            assignedDate: "2025-07-29",
        },
    ]);

    const statusOptions = ["Pending", "Picked Up", "In Transit", "Delivered", "Failed"];

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

    const handleStatusChange = (index, newStatus) => {
        const updated = [...parcels];
        updated[index].status = newStatus;
        setParcels(updated);
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
                                            <th>🔄 Update</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parcels.map((parcel, index) => (
                                            <tr key={parcel.id}>
                                                <td>{parcel.id}</td>
                                                <td>{parcel.sender}</td>
                                                <td>{parcel.receiver}</td>
                                                <td>{parcel.pickup}</td>
                                                <td>{parcel.delivery}</td>
                                                <td>{parcel.assignedDate}</td>
                                                <td>{statusBadge(parcel.status)}</td>
                                                <td>
                                                    <select
                                                        className="form-select form-select-sm"
                                                        value={parcel.status}
                                                        onChange={(e) =>
                                                            handleStatusChange(index, e.target.value)
                                                        }
                                                    >
                                                        {statusOptions.map((status) => (
                                                            <option key={status} value={status}>
                                                                {status}
                                                            </option>
                                                        ))}
                                                    </select>
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

export default AssignedParcels;
