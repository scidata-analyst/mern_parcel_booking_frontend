import { Link } from "react-router-dom";

import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function CreateParcel() {
    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />

                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">📂 Create Parcel</div>
                        <div className="card-body">
                            <Link
                                to="/"
                                className="btn btn-primary"
                            >
                                View Parcels
                            </Link>
                        </div>
                    </div>

                    <form className="row g-4">
                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="pickupAddress" placeholder="123 Main St" />
                                <label htmlFor="pickupAddress">📍 Pickup Address</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <input type="text" className="form-control" id="deliveryAddress" placeholder="456 Delivery St" />
                                <label htmlFor="deliveryAddress">📦 Delivery Address</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <select className="form-select" id="parcelType">
                                    <option value="">Select Type</option>
                                    <option value="small">Small</option>
                                    <option value="medium">Medium</option>
                                    <option value="large">Large</option>
                                </select>
                                <label htmlFor="parcelType">📦 Parcel Size/Type</label>
                            </div>
                        </div>

                        <div className="col-md-6">
                            <div className="form-floating">
                                <select className="form-select" id="paymentType">
                                    <option value="">Select Payment Mode</option>
                                    <option value="cod">Cash on Delivery</option>
                                    <option value="prepaid">Prepaid</option>
                                </select>
                                <label htmlFor="paymentType">💳 Payment Type</label>
                            </div>
                        </div>

                        <div className="col-12">
                            <button type="submit" className="btn btn-primary">
                                <i className="bi bi-plus-circle me-1"></i> Create Parcel
                            </button>
                        </div>
                    </form>
                </main>
            </div>
        </div>
    );
}

export default CreateParcel;
