import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

function AdminRoute({ children }) {

    const user = getCurrentUser();

    if (!user) {

        return <Navigate to="/login" />;

    }

    if (user.role !== "admin") {

        return <Navigate to="/" />;

    }

    return children;

}

export default AdminRoute;