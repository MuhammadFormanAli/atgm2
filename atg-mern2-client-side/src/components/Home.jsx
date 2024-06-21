import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import Posts from './Posts';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate()
    const { user, refetch } = useContext(UserContext)
    const [inputValue, setInputValue] = useState('');


    const handlePost = event => {
        event.preventDefault()
        const postText = event.target.post.value
        const postImage = event.target.postImage.value
        const date = new Date()

        const post = { postText, postImage, user, date }

        axios.post('http://localhost:5000/post', post)
            .then(res => {
                refetch()
            })
    }

    const handleLogOut = () => {
        localStorage.removeItem('logged-user')
        navigate('/login');

    }

    return (

        <div className='d-flex container gap-5'>
            <div>
                <form className='w-100 d-flex align-items-center gap-4 my-4' onSubmit={handlePost}>
                    <input className='w-100 rounded  p-3' autoComplete="off" type="text" name="post" placeholder='What is on your Mind' />
                    <input className='w-100 rounded  p-3' autoComplete="off" type="text" name="postImage" placeholder='Enter Your Post Image Url' />
                    <button className='p-3 rounded btn btn-primary'>Post</button>
                </form>


                {/* section for showing Posts  */}
                <Posts />
            </div>

            <div className='d-flex flex-column border h-25 profile-container align-items-center justify-content-center mt-4 p-5'>
                <img className='rounded-circle w-100' src="https://images.unsplash.com/photo-1633332755192-727a05c4013d?q=80&w=400&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D" alt="" />
                <p>@{user}</p>
                <button className='btn rounded border btn-warning' onClick={handleLogOut}>Log Out</button>
            </div>
        </div>


    );
};

export default Home;