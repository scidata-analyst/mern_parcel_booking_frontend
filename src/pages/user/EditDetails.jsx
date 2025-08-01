import { Link } from "react-router-dom";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function EditDetails() {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">👤 Edit User Details</div>
                        <div className="card-body">
                            <Link to="/" className="btn btn-primary">
                                Back to Dashboard
                            </Link>
                        </div>
                    </div>

                    <form className="row g-4">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="userName" placeholder="Full Name" />
                                <label htmlFor="userName">👤 Full Name</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="email" className="form-control" id="userEmail" placeholder="Email" />
                                <label htmlFor="userEmail">📧 Email Address</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="tel" className="form-control" id="userPhone" placeholder="Phone" />
                                <label htmlFor="userPhone">📱 Phone Number</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="password" className="form-control" id="userPassword" placeholder="Password" />
                                <label htmlFor="userPassword">🔒 Password</label>
                            </div>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-success">
                                <i className="bi bi-save me-1"></i> Save Changes
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default EditDetails;
