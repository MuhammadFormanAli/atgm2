import axios from 'axios';
import React, { useContext, useState } from 'react';
import { UserContext } from '../context/UserProvider';
import { useQuery } from 'react-query';
import PostEditModal from './PostEditModal';
import { Button, Dropdown, DropdownButton, Spinner } from 'react-bootstrap';

const Posts = () => {

    const { user, posts, postLoading, refetch, handleShow } = useContext(UserContext)


    const handleAddComment = (id) => {
        const postId = id
        const commentText = event.target.comment.value
        const comment = { commentText, userName: user, postId }
        axios.put('http://localhost:5000/comment/', comment)
            .then(res => {
                refetch()
                console.log(res.data)
            })
    }

    const handleLike = (id) => {
        const postId = id
        const liked = { userName: user, postId }
        axios.put('http://localhost:5000/like', liked)
            .then(res => {
                refetch()
                console.log(res.data)
            })
    }

    const handleDeletePost = (id) => {

        axios.delete(`http://localhost:5000/posts/${id}`)
            .then(res => {
                refetch()
                console.log(res.data)
            })
    }

    console.log(posts)
    return (
        <div className='post-container'>
            {
                postLoading && <div className='w-100 h-100 d-flex align-items-center justify-content-center'><Spinner animation="border" variant="primary" /></div>
            }

            {


                posts?.map(post =>
                    <section key={post?._id} className='container border rounded pt-3 my-1 bg-info bg-opacity-10 '>
                        <div className='bg-black bg-opacity-25 position-relative'>
                            <img className='post-img ' src={post?.postImage} alt="" />
                            <p className='py-2 px-3 text-center my-2'>{post?.postText}</p>


                            { user==post?.user &&
                                <DropdownButton className='top-0 end-0 m-0 fw-bolder    d-inline bg-opacity-50 pb-1  rounded-2 position-absolute' id="dropdown-basic-button" title="...">
                                    <Dropdown.Item onClick={() => handleShow(post)}>Edit</Dropdown.Item>
                                    <Dropdown.Item onClick={() => handleDeletePost(post?._id)}>Delete</Dropdown.Item>
                                </DropdownButton>
                            }
                        </div>


                        <div className='d-flex justify-content-between pb-3 align-items-center'>
                            <button onClick={() => { handleLike(post?._id) }} className={`btn border m-0 px-2 py-1`}>Like <span>({post?.likes?.length})</span></button>
                            <p className='btn border m-0 fw-bold'>Posted By@{post?.user}</p>
                        </div>



                        <div className='d-flex flex-column'>
                            {
                                post?.comments?.map((comment, index) =>
                                    <div className='bg-danger bg-opacity-10 mb-1 rounded ps-1' key={index}>
                                        <p className='m-0 p-0'>@{comment?.userName}</p>
                                        <p className='m-0 ps-5'>{comment?.commentText}</p>
                                    </div>)
                            }
                        </div>



                        <div className=' mb-3'>
                            <form className='d-flex' onSubmit={(e) => { e.preventDefault(); handleAddComment(post?._id); }}>
                                <textarea className=' w-100 bg-dark bg-opacity-10 border px-4 fw-semibold rounded ' autoComplete="off" name="comment" placeholder='Make a Comment' />
                                <button className='m-0 px-5 py-0   btn btn-success' type="submit" > Comment</button>
                            </form>
                        </div>
                    </section>
                )
            }
            <PostEditModal />
        </div>
    );
};

export default Posts;