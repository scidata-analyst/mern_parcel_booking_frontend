import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function ParcelHistory() {
    const parcels = [
        {
            id: "P12345",
            pickup: "123 Main St",
            delivery: "456 Market Rd",
            type: "Medium",
            payment: "COD",
            status: "Delivered",
            date: "2025-07-28",
        },
        {
            id: "P12346",
            pickup: "22 Elm Ave",
            delivery: "99 Oak Blvd",
            type: "Small",
            payment: "Prepaid",
            status: "In Transit",
            date: "2025-07-30",
        },
        {
            id: "P12347",
            pickup: "76 Hilltop Rd",
            delivery: "18 River Lane",
            type: "Large",
            payment: "COD",
            status: "Pending",
            date: "2025-07-31",
        },
    ];

    const statusBadge = (status) => {
        switch (status) {
            case "Delivered":
                return <span className="badge bg-success">{status}</span>;
            case "In Transit":
                return <span className="badge bg-warning text-dark">{status}</span>;
            case "Pending":
                return <span className="badge bg-secondary">{status}</span>;
            default:
                return <span className="badge bg-light text-dark">{status}</span>;
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
                                            <tr key={parcel.id}>
                                                <td>{parcel.id}</td>
                                                <td>{parcel.pickup}</td>
                                                <td>{parcel.delivery}</td>
                                                <td>{parcel.type}</td>
                                                <td>{parcel.payment}</td>
                                                <td>{parcel.date}</td>
                                                <td>{statusBadge(parcel.status)}</td>
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

export default ParcelHistory;
