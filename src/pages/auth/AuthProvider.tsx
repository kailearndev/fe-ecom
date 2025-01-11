import { Navigate, Outlet } from "react-router";
import Navbar from "../../layouts/nav";

const AuthProvider = () => {
    const token = localStorage.getItem('token');


    return token ?
        <Navbar>
            <div className="px-5 py-5 scroll-smooth">
                <Outlet />
            </div>
        </Navbar>
        : <Navigate to="/login" />;
};

export default AuthProvider;
