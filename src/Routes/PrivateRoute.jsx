import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import { Navigate } from "react-router-dom";
import LogIn from "../Pages/LogIn/LogIn";

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    if(loading){
        return <div>load...</div>
    }

    if (user?.email){
        return children;
    }
    return (
        <Navigate to={<LogIn></LogIn>}>
            {children}
        </Navigate>
    );
};

export default PrivateRoute;