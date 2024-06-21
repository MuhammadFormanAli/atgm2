import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { useQuery } from "react-query";

export const UserContext = createContext(null);
const UserProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const [modalPost, setModalPost] = useState('')

 const handleShow = (post) => {
        setModalPost(post)
        setShow(true)
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    


    const { data: posts = [] , isLoading:postLoading, refetch} = useQuery({
        queryKey: ['posts',],
        queryFn: async () => {
            const res = await axios('http://localhost:5000/posts')

            return res.data;
        }
    })


    useEffect(() => {
        const loggedUser = localStorage.getItem('logged-user');
            setUser(loggedUser);
            setLoading(false)
    }, [])



    const userInfo = {
        user,
        posts,
        postLoading,
        refetch,
        setUser,
        loading,
        show,
        handleClose,
        handleShow,
        modalPost,
        
    }

    
    return (
        <UserContext.Provider value={userInfo}>
            {children}
        </UserContext.Provider>
    );
};

export default UserProvider;