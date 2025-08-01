import Sidebar from "../component/Sidebar";
import Header from "../component/Header";
import { useEffect, useState } from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    BarChart,
    Bar,
    PieChart,
    Pie,
    Cell,
    Legend,
    ResponsiveContainer,
} from "recharts";

function AdminDashboard() {
    const [stats, setStats] = useState({
        dailyBookings: 42,
        failedDeliveries: 3,
        codAmount: 12500,
    });

    const bookingData = [
        { day: "Sat", bookings: 22 },
        { day: "Sun", bookings: 34 },
        { day: "Mon", bookings: 28 },
        { day: "Tue", bookings: 42 },
        { day: "Wed", bookings: 35 },
        { day: "Thu", bookings: 40 },
        { day: "Fri", bookings: 44 },
    ];

    const failedData = [
        { day: "Sat", failed: 1 },
        { day: "Sun", failed: 2 },
        { day: "Mon", failed: 0 },
        { day: "Tue", failed: 1 },
        { day: "Wed", failed: 3 },
        { day: "Thu", failed: 2 },
        { day: "Fri", failed: 1 },
    ];

    const paymentData = [
        { name: "COD", value: 12500 },
        { name: "Prepaid", value: 8000 },
    ];

    const COLORS = ["#28a745", "#0d6efd"];

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <h4 className="mb-4 fw-bold">📊 Admin Dashboard</h4>

                    <div className="row g-4 mb-4">
                        <div className="col-md-4">
                            <div className="card shadow-sm border-0 text-white bg-primary h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="bi bi-box-seam me-2"></i>
                                        Daily Bookings
                                    </h5>
                                    <h2 className="fw-bold">{stats.dailyBookings}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm border-0 text-white bg-danger h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="bi bi-x-circle me-2"></i>
                                        Failed Deliveries
                                    </h5>
                                    <h2 className="fw-bold">{stats.failedDeliveries}</h2>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card shadow-sm border-0 text-white bg-success h-100">
                                <div className="card-body">
                                    <h5 className="card-title">
                                        <i className="bi bi-cash-coin me-2"></i>
                                        COD Collected
                                    </h5>
                                    <h2 className="fw-bold">৳ {stats.codAmount.toLocaleString()}</h2>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Charts */}
                    <div className="row g-4">
                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-white fw-bold">📈 Bookings This Week</div>
                                <div className="card-body">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <LineChart data={bookingData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="bookings" stroke="#0d6efd" />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-white fw-bold">❌ Failed Deliveries</div>
                                <div className="card-body">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <BarChart data={failedData}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="day" />
                                            <YAxis />
                                            <Tooltip />
                                            <Bar dataKey="failed" fill="#dc3545" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="card shadow-sm border-0 h-100">
                                <div className="card-header bg-white fw-bold">💳 Payment Breakdown</div>
                                <div className="card-body">
                                    <ResponsiveContainer width="100%" height={250}>
                                        <PieChart>
                                            <Pie
                                                data={paymentData}
                                                dataKey="value"
                                                nameKey="name"
                                                cx="50%"
                                                cy="50%"
                                                outerRadius={80}
                                                label
                                            >
                                                {paymentData.map((entry, index) => (
                                                    <Cell key={index} fill={COLORS[index % COLORS.length]} />
                                                ))}
                                            </Pie>
                                            <Tooltip />
                                            <Legend />
                                        </PieChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AdminDashboard;
