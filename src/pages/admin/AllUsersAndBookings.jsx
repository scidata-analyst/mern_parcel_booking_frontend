import { useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function AllUsersAndBookings() {
    const [users, setUsers] = useState([
        {
            id: 1,
            name: "Arif Hossain",
            email: "arif@example.com",
            role: "Customer",
            bookings: [
                { id: "P101", pickup: "Banani", delivery: "Gulshan", status: "Delivered" },
                { id: "P102", pickup: "Uttara", delivery: "Mirpur", status: "In Transit" },
            ],
        },
        {
            id: 2,
            name: "Lamia Akter",
            email: "lamia@example.com",
            role: "Customer",
            bookings: [
                { id: "P103", pickup: "Dhanmondi", delivery: "Mohakhali", status: "Failed" },
            ],
        },
        {
            id: 3,
            name: "Tanvir Ahmed",
            email: "tanvir@example.com",
            role: "Agent",
            bookings: [],
        },
    ]);

    const [openUser, setOpenUser] = useState(null);

    const toggleUserBookings = (id) => {
        setOpenUser(openUser === id ? null : id);
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">
                            👥 All Users & Bookings
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>👤 Name</th>
                                            <th>📧 Email</th>
                                            <th>🔐 Role</th>
                                            <th>📦 Bookings</th>
                                            <th>🔍 View</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {users.map((user) => (
                                            <>
                                                <tr key={user.id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.email}</td>
                                                    <td>{user.role}</td>
                                                    <td>{user.bookings.length}</td>
                                                    <td>
                                                        <button
                                                            className="btn btn-outline-primary btn-sm"
                                                            type="button"
                                                            onClick={() => toggleUserBookings(user.id)}
                                                        >
                                                            {openUser === user.id ? (
                                                                <i className="bi bi-eye"></i>
                                                            ) : (
                                                                <i className="bi bi-eye"></i>
                                                            )}
                                                            view here
                                                        </button>
                                                    </td>
                                                </tr>

                                                {openUser === user.id && user.bookings.length > 0 && (
                                                    <tr key={`details-${user.id}`}>
                                                        <td colSpan="5">
                                                            <table className="table table-sm table-bordered mt-2">
                                                                <thead className="table-secondary">
                                                                    <tr>
                                                                        <th>Parcel ID</th>
                                                                        <th>Pickup</th>
                                                                        <th>Delivery</th>
                                                                        <th>Status</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {user.bookings.map((b) => (
                                                                        <tr key={b.id}>
                                                                            <td>{b.id}</td>
                                                                            <td>{b.pickup}</td>
                                                                            <td>{b.delivery}</td>
                                                                            <td>
                                                                                <span className={`badge bg-${getStatusColor(b.status)}`}>
                                                                                    {b.status}
                                                                                </span>
                                                                            </td>
                                                                        </tr>
                                                                    ))}
                                                                </tbody>
                                                            </table>
                                                        </td>
                                                    </tr>
                                                )}
                                            </>
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

/* get status color */
function getStatusColor(status) {
    switch (status) {
        case "Delivered":
            return "success";
        case "In Transit":
            return "warning text-dark";
        case "Failed":
            return "danger";
        default:
            return "secondary";
    }
}

export default AllUsersAndBookings;
