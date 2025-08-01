import { useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function AssignAgents() {
    const [parcels, setParcels] = useState([
        {
            id: "P2001",
            pickup: "Banani, Dhaka",
            delivery: "Gulshan, Dhaka",
            assignedAgent: "",
        },
        {
            id: "P2002",
            pickup: "Uttara, Dhaka",
            delivery: "Mirpur, Dhaka",
            assignedAgent: "",
        },
    ]);

    const agents = ["Shamim", "Lamia", "Rafiq", "Tanvir"];

    const handleAgentAssign = (index, agentName) => {
        const updated = [...parcels];
        updated[index].assignedAgent = agentName;
        setParcels(updated);
    };

    const handleSubmit = (index) => {
        const parcel = parcels[index];
        console.log("Assigning Agent:", parcel);
        // TODO: Replace with actual API call
        // fetch(`/api/parcels/${parcel.id}/assign`, { method: 'POST', body: JSON.stringify({ agent: parcel.assignedAgent }) })
    };

    return (
        <div className="container-fluid">
            <div className="row">
                <Sidebar />
                <main className="col-md-10 ms-sm-auto px-md-5 py-4">
                    <Header />

                    <div className="card shadow-sm border-0 mb-4">
                        <div className="card-header bg-white fw-bold">
                            🧾 Assign Delivery Agents to Parcels
                        </div>
                        <div className="card-body">
                            <div className="table-responsive">
                                <table className="table table-bordered align-middle">
                                    <thead className="table-light">
                                        <tr>
                                            <th>📦 Parcel ID</th>
                                            <th>🚚 Pickup Address</th>
                                            <th>📬 Delivery Address</th>
                                            <th>👤 Assign Agent</th>
                                            <th>✅ Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {parcels.map((parcel, index) => (
                                            <tr key={parcel.id}>
                                                <td>{parcel.id}</td>
                                                <td>{parcel.pickup}</td>
                                                <td>{parcel.delivery}</td>
                                                <td>
                                                    <select
                                                        className="form-select"
                                                        value={parcel.assignedAgent}
                                                        onChange={(e) =>
                                                            handleAgentAssign(index, e.target.value)
                                                        }
                                                    >
                                                        <option value="">Select Agent</option>
                                                        {agents.map((agent) => (
                                                            <option key={agent} value={agent}>
                                                                {agent}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </td>
                                                <td>
                                                    <button
                                                        className="btn btn-success btn-sm"
                                                        onClick={() => handleSubmit(index)}
                                                        disabled={!parcel.assignedAgent}
                                                    >
                                                        <i className="bi bi-person-check me-1"></i> Assign
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                                {parcels.length === 0 && (
                                    <div className="text-muted text-center py-4">No unassigned parcels</div>
                                )}
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AssignAgents;
