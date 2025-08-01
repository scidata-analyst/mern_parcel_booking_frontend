import { Link } from "react-router-dom";

import Sidebar from "./pages/component/Sidebar";
import Header from "./pages/component/Header";

function Dashboard() {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">📂 Item List</div>
                        <div className="card-body">
                            <div className="row g-4">
                                <div className="col-md-4">
                                    <div className="card h-100 border shadow-sm project-card">
                                        <div className="card-body d-flex flex-column">
                                            <h6 className="card-title">
                                                <Link
                                                    to="/"
                                                    className="text-decoration-none text-dark"
                                                >
                                                    Total Customer
                                                </Link>
                                            </h6>
                                            <p className="text-muted small flex-grow-1">
                                                Desc..
                                            </p>
                                            <div className="mb-2">
                                                <span
                                                    className="active"
                                                >
                                                    Active
                                                </span>
                                            </div>
                                            <Link
                                                to="/"
                                                className="btn btn-sm btn-primary mt-auto"
                                            >
                                                Open
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <style>{`
                        .project-card {
                            transition: transform 0.2s, box-shadow 0.2s;
                        }
                        .project-card:hover {
                            transform: translateY(-6px);
                            box-shadow: 0 8px 16px rgba(0,0,0,0.15);
                        }
                    `}</style>
                </main>
            </div>
        </div>
    );
}

export default Dashboard;
