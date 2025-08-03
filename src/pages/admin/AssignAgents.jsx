import { useEffect, useState } from "react";
import Sidebar from "../component/Sidebar";
import Header from "../component/Header";

function AssignAgents() {
    const [parcels, setParcels] = useState([]);
    const [agents, setAgents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorMsg, setErrorMsg] = useState("");
    const [successMsg, setSuccessMsg] = useState("");
    const token = localStorage.getItem("token");

    useEffect(() => {
        fetchParcels();
        fetchAgents();
    }, []);

    const fetchParcels = () => {
        setLoading(true);
        fetch(`${import.meta.env.VITE_API_URL}/api/parcel/parcels`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then(setParcels)
            .catch(() => setErrorMsg("❌ Failed to fetch parcels"))
            .finally(() => setLoading(false));
    };

    const fetchAgents = () => {
        fetch(`${import.meta.env.VITE_API_URL}/api/user/all`, {
            headers: { Authorization: `Bearer ${token}` },
        })
            .then((res) => res.json())
            .then((data) => {
                const agentUsers = data.filter((user) => user.role === "agent");
                setAgents(agentUsers);
            })
            .catch(() => setErrorMsg("❌ Failed to fetch agents"));
    };

    const handleAgentAssign = (index, agentId) => {
        const updated = [...parcels];
        updated[index].assignedAgent = agentId;
        setParcels(updated);
    };

    const handleSubmit = async (index, historyId) => {
        const parcel = parcels[index];
        setErrorMsg("");
        setSuccessMsg("");

        if (!historyId) {
            setErrorMsg("❌ No history ID available for this parcel.");
            return;
        }

        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/parcelhistory/assign-agent/${historyId}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ agent_id: parcel.assignedAgent }),
            });

            if (!res.ok) throw new Error("❌ Failed to assign agent");

            setSuccessMsg(`✅ Agent assigned successfully to parcel ${parcel._id}`);
            fetchParcels();
        } catch (err) {
            setErrorMsg(err.message || "❌ Assignment failed");
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
                            🧾 Assign Delivery Agents to Parcels
                        </div>
                        <div className="card-body">
                            {successMsg && (
                                <div className="alert alert-success alert-dismissible fade show" role="alert">
                                    {successMsg}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setSuccessMsg("")}
                                    ></button>
                                </div>
                            )}
                            {errorMsg && (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    {errorMsg}
                                    <button
                                        type="button"
                                        className="btn-close"
                                        onClick={() => setErrorMsg("")}
                                    ></button>
                                </div>
                            )}

                            {loading ? (
                                <div className="text-center py-5">
                                    <div className="spinner-border text-primary" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            ) : (
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
                                                <tr key={parcel._id}>
                                                    <td>{parcel._id}</td>
                                                    <td>{parcel.pickup_address}</td>
                                                    <td>{parcel.delivery_address}</td>
                                                    <td>
                                                        <select
                                                            className="form-select"
                                                            value={parcel.assignedAgent || parcel.history?.[0]?.agent?._id || ""}
                                                            onChange={(e) => handleAgentAssign(index, e.target.value)}
                                                        >
                                                            <option value="">Select Agent</option>
                                                            {agents.map((agent) => (
                                                                <option key={agent._id} value={agent._id}>
                                                                    {agent.name}
                                                                </option>
                                                            ))}
                                                        </select>

                                                    </td>
                                                    <td>
                                                        {parcel.history?.[0]?._id ? (
                                                            <button
                                                                className="btn btn-success btn-sm"
                                                                onClick={() =>
                                                                    handleSubmit(index, parcel.history[0]._id)
                                                                }
                                                                disabled={!parcel.assignedAgent}
                                                            >
                                                                <i className="bi bi-person-check me-1"></i> Assign
                                                            </button>
                                                        ) : (
                                                            <span className="text-danger small">No history</span>
                                                        )}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {parcels.length === 0 && (
                                        <div className="text-muted text-center py-4">
                                            No unassigned parcels found.
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}

export default AssignAgents;
