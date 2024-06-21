import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";

const Register = () => {
    const { setUser, user } = useContext(UserContext)
    const [error, setError]= useState('')

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    const handleRegister = event => {
        event.preventDefault();
        const userName = event.target.userName.value
        const email = event.target.email.value
        const password = event.target.password.value

        if (password.length < 6) {
            return setError('password will be attest 6 characters')
        }

        

        const user = { userName, email, password }

        axios.post('http://localhost:5000/register', user)
            .then(res => {
                if (res.data.insertedId) {
                    localStorage.setItem('logged-user', userName)

                    setUser(userName)
                    navigate('/');
                }
                console.log(res.data)
            })
            .catch(error => {
                // Handle error
                
            });



        console.log(userName, email, password)
    }

    console.log(user)

    return (
        <div className=" mt-5 container ">
            <h1 className="text-center">Please Register Here</h1>
            <form className=" p-4 d-flex flex-column gap-3" onSubmit={handleRegister}>

                <input className=" p-2 fw-semibold" type="text" name="userName" id="" required placeholder="User Name" />
                <input className=" p-2 fw-semibold" type="email" name="email" id="" required placeholder="Email" />

                <div className="d-flex flex-column">
                    <input className=" p-2 fw-semibold" type={showPassword ? 'text' : 'password'} name="password" id="" required placeholder="Enter Password" />
                    <p className="show-hide-btn text-center p-0 bg-white text-black border my-1" onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</p>
                </div>
                <button type="submit" className="btn btn-primary">
                    Register
                </button>
                <div className="d-flex justify-content-between">
                    <p>Already have an account! <Link to='/login'><strong>Login</strong></Link></p>
                    <p className="text-danger fs-6">{error}</p>
                </div>

            </form>
            
        </div>
    );
};

export default Register;