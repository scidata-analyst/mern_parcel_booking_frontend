import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

function Sidebar() {
    const navigate = useNavigate();

    const profile = localStorage.getItem("user");
    const userProfile = profile ? JSON.parse(profile) : {};
    const profileID = userProfile._id;

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            navigate("/login");
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/user/verify-token`, {
            method: "GET",
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => {
                if (res.message === "okay") {
                    console.log(res);
                } else {
                    // localStorage.removeItem("token");
                    // localStorage.removeItem("user");
                    // navigate("/login");
                }
            })
            .catch(() => {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            });
    }, [navigate]);

    return (
        <>
            <nav className="col-md-2 d-none d-md-block bg-light sidebar min-vh-100">
                <div className="position-sticky pt-3">
                    <h1 className="text-center mt-3 pb-3 border-bottom">Admin Panel</h1>
                    <ul className="nav flex-column mt-4">
                        <li className="nav-item">
                            <Link className="nav-link" to={`/`}>
                                ➕ Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/create-parcel`}>
                                ➕ Create Parcel
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/track-parcel`}>
                                ➕ Track Parcel
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/parcel-history`}>
                                ➕ Parcel History
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/assigned-parcels`}>
                                ➕ Assigned Parcels
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/assign-agents`}>
                                ➕ Assign Agents
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/admin-dashboard`}>
                                ➕ Admin Dashboard
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/all-users-and-bookings`}>
                                ➕ All Bookings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/booking-analytics`}>
                                ➕ Booking Reports
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/user-list`}>
                                ➕ User List
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/profile/${profileID}`}>
                                ➕ profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/edit-details/${profileID}`}>
                                ➕ Edit Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link" to={`/create-agent`}>
                                ➕ Create Agent
                            </Link>
                        </li>
                        <li className="nav-item mt-4">
                            <button
                                className="btn btn-outline-danger w-100"
                                onClick={() => {
                                    localStorage.removeItem("token");
                                    localStorage.removeItem("user");
                                    navigate("/login");
                                }}
                            >
                                🚪 Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;