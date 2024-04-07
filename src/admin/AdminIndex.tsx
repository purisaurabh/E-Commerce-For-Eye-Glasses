import { BrowserRouter as Router, Link, Route, Routes, useNavigate } from "react-router-dom";
import Product from "./components/AdminProductListing/product";
import { clearStoredState } from "../api/store/store";
import Login from "../components/pages/Login";
import { useDispatch } from "react-redux";
import { logout } from "../api/store/authSlice";
import { notify } from "../utils/utils";
import Users from "./components/AdminUserListing/users";
import LandingPage from "./components/LandingPage/landingPage";

const LogoutButton = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        clearStoredState();
        dispatch(logout());
        navigate('/login');
        notify("success", "Logged out successfully", 0);
    };

    return <button onClick={handleLogout}>Logout</button>;
};


const AdminDashboard = () => {
    return (
        <>
            <Router>
                <div className="flex h-screen">
                    <div className="bg-gray-900 text-white w-1/5">
                        <h1 className="text-xl font-bold p-4">Admin</h1>
                        <ul className="pl-4">
                            <li className="py-3 px-4"><Link to={"admin/products"}>Products</Link></li>
                            <li className="py-3 px-4"><Link to={"admin/users"}>Users</Link></li>
                            <li className="py-3 px-4"><LogoutButton /></li>
                        </ul>
                    </div>

                    <div className="bg-white w-4/5 p-8">
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="admin/products" element={<Product />} />
                            <Route path="login" element={<Login />} />
                            <Route path="admin/users" element={<Users />} />
                        </Routes>
                    </div>
                </div>
            </Router >
        </>
    );
};

export default AdminDashboard;