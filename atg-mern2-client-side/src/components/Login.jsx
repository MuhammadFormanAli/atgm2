import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserProvider";


const Login = () => {
  const {setUser} = useContext(UserContext)
  const [error, setError]= useState('')

  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = event => {
    event.preventDefault();
    const userName = event.target.userName.value
    const password = event.target.password.value

    const user = {userName,password}

    axios.post('http://localhost:5000/login', user)
            .then(res => {
                if (res.data.status === 'ok') {
                    localStorage.setItem('logged-user', userName)
                    setUser(userName)
                    navigate('/');
                }
                console.log(res.data)
            })
            .catch(error => {
                // Handle error
                
            });

   console.log(userName, password)
  }

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);

  };

  return (
    <div className=" mt-5 container  ">
      <h1 className="text-center">Please Login Here</h1>
      <form className=" p-4 d-flex flex-column gap-3" onSubmit={handleLogin}>

        <input className=" p-2 fw-semibold" type="text" name="userName" required placeholder="User Name" />
        <div className="d-flex flex-column">
          <input className=" p-2 fw-semibold" type={showPassword ? 'text' : 'password'} name="password"  required placeholder="Enter Password" />
          <p className="show-hide-btn p-0 text-center bg-white text-black border my-1" onClick={togglePasswordVisibility}>{showPassword ? 'Hide' : 'Show'}</p>
        </div>
        <button type="submit" className="btn btn-primary">
          Login
        </button>
        <div className="d-flex justify-content-between">
          
          <p>Don't have an account! <Link to='/register'><strong>Register</strong></Link></p>
          <p className="text-danger fs-6">{error}</p>
        </div>
      </form>
    </div>
  );
};

export default Login;