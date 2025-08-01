import { Routes, Route } from 'react-router-dom'
import Dashboard from './Dashboard'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'

function App() {

    return (
        <>
            <Routes>
                {/* auth routes */}
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />

                {/* dashboard routes */}
                <Route path="/" element={<Dashboard />} />
            </Routes>
        </>
    )
}

export default App
