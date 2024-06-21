import { useContext } from 'react';
import { Navigate, } from 'react-router-dom'
import { UserContext } from '../context/UserProvider';


const PrivetRoute = ({ children }) => {

    const{user,loading} = useContext(UserContext)
    

    if (loading) {
        return <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div>
    }

    if (user) {
        return children 
    }

    return (<Navigate to="/login"></Navigate>)
};

export default PrivetRoute;