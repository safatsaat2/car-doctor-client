import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location =useLocation()
    if(loading){
        return <div>load...</div>
    }

    if (user?.email){
        return children;
    }
    return (
        <Navigate to='/login' state={{from: location}} replace>
            {children}
        </Navigate>
    );
};

export default PrivateRoute;