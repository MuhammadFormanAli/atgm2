import React, { useContext } from 'react';
import { Button, Modal } from 'react-bootstrap';
import { UserContext } from '../context/UserProvider';
import axios from 'axios';

const PostEditModal = () => {

    const { show, handleClose, modalPost,refetch } = useContext(UserContext)

// console.log(modalPost)

    const handleEditPost = (e) => {
        e.preventDefault()
        const editPost = e.target.editPost.value
        // console.log(editPost)

        axios.put(`http://localhost:5000/posts/${modalPost._id}`,{editPost})
        .then(res => {
            refetch()
            handleClose()
            console.log(res.data)
        })

    }

    return (
        <Modal
            show={show}
            onHide={handleClose}
        >

            <Modal.Header closeButton>
                <Modal.Title>Edit Your Post</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <form className='position-relative' onSubmit={handleEditPost}>
                    <textarea className='w-100 p-2  mb-5' type="text" name="editPost" defaultValue={modalPost?.postText} />
                    <Button className='position-absolute bottom-0 end-0 ' variant="success" type='submit'>Save</Button>
                </form>
            </Modal.Body>
            
        </Modal>
    );
};

export default PostEditModal;