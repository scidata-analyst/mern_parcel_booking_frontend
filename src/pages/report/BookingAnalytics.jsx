import { useState, useEffect, useRef } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { Bar, Pie, Line } from "react-chartjs-2";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

import jsPDF from "jspdf";
import "jspdf-autotable";
import Papa from "papaparse";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
} from "chart.js";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement
);

ChartJS.defaults.font.family = "'Original Surfer', sans-serif";
ChartJS.defaults.font.size = 14;
ChartJS.defaults.color = "#212529";

const agentsList = [
    { id: "a1", name: "Tanvir Ahmed" },
    { id: "a2", name: "Sonia Rahman" },
    { id: "a3", name: "Rafiq Islam" },
];

/* Generate mock data */
const generateMockData = () => {
    return {
        dailyBookings: [5, 12, 8, 15, 9, 10, 7],
        dates: [
            "2025-07-25",
            "2025-07-26",
            "2025-07-27",
            "2025-07-28",
            "2025-07-29",
            "2025-07-30",
            "2025-07-31",
        ],
        statusCounts: {
            pickedUp: 35,
            inTransit: 22,
            delivered: 50,
            failed: 5,
        },
        codAmount: 15000,
        prepaidAmount: 35000,
        topPickupLocations: [
            { location: "Banani", count: 15 },
            { location: "Gulshan", count: 12 },
            { location: "Dhanmondi", count: 8 },
            { location: "Uttara", count: 7 },
        ],
        revenueTrend: [
            { date: "2025-07-25", revenue: 1000 },
            { date: "2025-07-26", revenue: 1500 },
            { date: "2025-07-27", revenue: 900 },
            { date: "2025-07-28", revenue: 2000 },
            { date: "2025-07-29", revenue: 1700 },
            { date: "2025-07-30", revenue: 2200 },
            { date: "2025-07-31", revenue: 1800 },
        ],
    };
};

function BookingAnalytics() {
    const [startDate, setStartDate] = useState(new Date("2025-07-25"));
    const [endDate, setEndDate] = useState(new Date("2025-07-31"));
    const [selectedAgent, setSelectedAgent] = useState("");
    const [stats, setStats] = useState(generateMockData());

    useEffect(() => {
        setStats(generateMockData());
    }, [startDate, endDate, selectedAgent]);

    /* Chart refs */
    const barRef = useRef(null);
    const pieRef = useRef(null);
    const lineRef = useRef(null);
    const pickupRef = useRef(null);

    /* Chart data */
    const barData = {
        labels: stats.dates,
        datasets: [
            {
                label: "Daily Bookings",
                data: stats.dailyBookings,
                backgroundColor: "rgba(13, 110, 253, 0.7)",
            },
        ],
    };

    const pieData = {
        labels: ["Picked Up", "In Transit", "Delivered", "Failed"],
        datasets: [
            {
                label: "Booking Status",
                data: [
                    stats.statusCounts.pickedUp,
                    stats.statusCounts.inTransit,
                    stats.statusCounts.delivered,
                    stats.statusCounts.failed,
                ],
                backgroundColor: [
                    "#0d6efd",
                    "#ffc107",
                    "#198754",
                    "#dc3545",
                ],
            },
        ],
    };

    const paymentPieData = {
        labels: ["COD Amount", "Prepaid Amount"],
        datasets: [
            {
                label: "Payment Type",
                data: [stats.codAmount, stats.prepaidAmount],
                backgroundColor: ["#fd7e14", "#0d6efd"],
            },
        ],
    };

    const pickupLocationsData = {
        labels: stats.topPickupLocations.map((loc) => loc.location),
        datasets: [
            {
                label: "Top Pickup Locations",
                data: stats.topPickupLocations.map((loc) => loc.count),
                backgroundColor: "rgba(13, 110, 253, 0.7)",
            },
        ],
    };

    const revenueTrendData = {
        labels: stats.revenueTrend.map((d) => d.date),
        datasets: [
            {
                label: "Revenue",
                data: stats.revenueTrend.map((d) => d.revenue),
                fill: false,
                borderColor: "#0d6efd",
                backgroundColor: "#0d6efd",
            },
        ],
    };

    /* Export functions */
    const exportCSV = () => {
        const rows = [
            ["Date", "Bookings", "Picked Up", "In Transit", "Delivered", "Failed", "COD", "Prepaid"],
        ];

        stats.dates.forEach((date, idx) => {
            rows.push([
                date,
                stats.dailyBookings[idx],
                stats.statusCounts.pickedUp,
                stats.statusCounts.inTransit,
                stats.statusCounts.delivered,
                stats.statusCounts.failed,
                stats.codAmount,
                stats.prepaidAmount,
            ]);
        });

        const csv = Papa.unparse(rows);
        const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "booking_analytics_report.csv";
        a.click();
        a.remove();
    };

    /* Export to PDF */
    const exportPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Booking Analytics Report", 14, 20);

        const addChartImage = (ref, y, title) => {
            if (!ref.current) return;
            const chart = ref.current;
            const imgData = chart.toBase64Image();
            doc.setFontSize(14);
            doc.text(title, 14, y);
            doc.addImage(imgData, "PNG", 14, y + 4, 180, 80);
        };

        addChartImage(barRef, 30, "Daily Bookings");
        addChartImage(pieRef, 115, "Booking Status Distribution");
        addChartImage(lineRef, 200, "Revenue Trend");
        // You can add more charts similarly

        doc.save("booking_analytics_report.pdf");
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />
                    <h3 className="mb-4">📊 Booking Analytics & Reports</h3>

                    {/* Filters */}
                    <div className="row mb-4">
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-semibold">Start Date</label>
                            <div>
                                <DatePicker
                                    selected={startDate}
                                    onChange={(date) => setStartDate(date)}
                                    className="form-control"
                                    maxDate={endDate}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-semibold">End Date</label>
                            <div>
                                <DatePicker
                                    selected={endDate}
                                    onChange={(date) => setEndDate(date)}
                                    className="form-control"
                                    minDate={startDate}
                                    dateFormat="yyyy-MM-dd"
                                />
                            </div>
                        </div>
                        <div className="col-md-4 mb-3">
                            <label className="form-label fw-semibold">Agent</label>
                            <div>
                                <select
                                    className="form-select d-block w-100"
                                    value={selectedAgent}
                                    onChange={(e) => setSelectedAgent(e.target.value)}
                                >
                                    <option value="">All Agents</option>
                                    {agentsList.map((agent) => (
                                        <option key={agent.id} value={agent.id}>
                                            {agent.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Export buttons */}
                    <div className="mb-4">
                        <button className="btn btn-outline-success me-2" onClick={exportCSV}>
                            <i className="bi bi-file-earmark-spreadsheet"></i> Export CSV
                        </button>
                        <button className="btn btn-outline-danger" onClick={exportPDF}>
                            <i className="bi bi-file-earmark-pdf"></i> Export PDF
                        </button>
                    </div>

                    {/* Charts */}
                    <div className="row">
                        <div className="col-md-6 mb-4" style={{ height: 300 }}>
                            <div className="card shadow-sm">
                                <div className="card-header fw-bold">Daily Bookings</div>
                                <div className="card-body">
                                    <Bar data={barData} ref={barRef} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4" style={{ height: 300 }}>
                            <div className="card shadow-sm">
                                <div className="card-header fw-bold">Booking Status Distribution</div>
                                <div className="card-body d-flex justify-content-center">
                                    <Pie data={pieData} ref={pieRef} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4" style={{ height: 300 }}>
                            <div className="card shadow-sm">
                                <div className="card-header fw-bold">Revenue Trend</div>
                                <div className="card-body">
                                    <Line data={revenueTrendData} ref={lineRef} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6 mb-4" style={{ height: 300 }}>
                            <div className="card shadow-sm">
                                <div className="card-header fw-bold">Top Pickup Locations</div>
                                <div className="card-body">
                                    <Bar data={pickupLocationsData} ref={pickupRef} options={{ maintainAspectRatio: false }} />
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default BookingAnalytics;
