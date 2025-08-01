import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CreateParcel from './pages/parcel/CreateParcel'
import ParcelHistory from './pages/parcel/ParcelHistory'
import TrackParcel from './pages/parcel/TrackParcel'
import AssignedParcels from './pages/parcel/AssignedParcels'

function App() {

    return (
        <>
            <Routes>
                {/* auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* dashboard routes */}
                <Route path="/" element={<Dashboard />} />
                <Route path="/create-parcel" element={<CreateParcel />} />
                <Route path="/parcel-history" element={<ParcelHistory />} />
                <Route path="/track-parcel" element={<TrackParcel />} />
                <Route path="/assigned-parcels" element={<AssignedParcels />} />
            </Routes>
        </>
    )
}

export default App
