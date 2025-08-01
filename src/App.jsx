import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import CreateParcel from './pages/parcel/CreateParcel'
import ParcelHistory from './pages/parcel/ParcelHistory'
import TrackParcel from './pages/parcel/TrackParcel'
import AssignedParcels from './pages/parcel/AssignedParcels'
import AdminDashboard from './pages/admin/AdminDashboard'
import AssignAgents from './pages/admin/AssignAgents'
import AllUsersAndBookings from './pages/admin/AllUsersAndBookings'
import BookingAnalytics from './pages/report/BookingAnalytics'
import UserList from './pages/user/UserList'
import Profile from './pages/user/Profile'
import EditDetails from './pages/user/EditDetails'
import CreateAgent from './pages/agent/CreateAgent'


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

                {/* admin routes */}
                <Route path="/admin-dashboard" element={<AdminDashboard />} />
                <Route path="/assign-agents" element={<AssignAgents />} />
                <Route path="/all-users-and-bookings" element={<AllUsersAndBookings />} />

                {/* report routes */}
                <Route path="/booking-analytics" element={<BookingAnalytics />} />

                {/* user routes */}
                <Route path="/user-list" element={<UserList />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/edit-details" element={<EditDetails />} />

                {/* agent routes */}
                <Route path="/create-agent" element={<CreateAgent />} />
            </Routes>
        </>
    )
}

export default App
