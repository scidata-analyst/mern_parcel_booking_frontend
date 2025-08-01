import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        if (!token) {
            navigate('/login');
            return;
        }

        fetch(`${import.meta.env.VITE_API_URL}/api/user/verify-token`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) throw new Error("Invalid or expired token");
                return res.json();
            })
            .then((data) => {
                console.log("Token valid:", data);
            })
            .catch(() => {
                localStorage.removeItem('token');
                localStorage.removeItem('user');
                navigate('/login');
            });
    }, []);

    return (
        <div className="col-md-12">
            <div className="card">
                <div className="card-header">
                    <div className="d-flex align-items-center justify-content-between">
                        <div className="pt-2 pb-2">Dashboard</div>
                        <div className="dropdown">
                            <div className="dropdown-toggle pt-2 pb-2"
                                id="dropdownMenuButton1" data-bs-toggle="dropdown"
                                aria-expanded="false">
                                welcome Mr. John deo
                            </div>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                <li><a className="dropdown-item" href="#">Profile</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
