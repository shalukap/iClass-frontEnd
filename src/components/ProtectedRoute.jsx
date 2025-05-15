import { Navigate, Outlet } from "react-router-dom"
import Dashboard from "../pages/admin/Dashboard"

const ProtectedRoute = ({children}) => {
    const token = localStorage.getItem('token')
    return token ? <Dashboard /> : <Navigate to="/" />
}

export default ProtectedRoute