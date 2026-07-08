import { Navigate } from "react-router-dom";
import { getCurrentUser } from "../services/auth";

function ProtectedRoute({ children }) {

    const user = getCurrentUser();

    if (!user) {
        return <Navigate to="/login" />;
    }

    return children;
}

export default ProtectedRoute;