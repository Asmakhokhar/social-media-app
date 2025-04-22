import axios from 'axios';
import { Loader2 } from 'lucide-react';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';

const Signup = () => {

  const [input, setInput] = useState({
    userName: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value })
  };
  const signupHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      setLoading(true);
      const res = await axios.post('http://localhost:8080/api/v1/user/register', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/")
        toast.success(res.data.message)
        setInput({
          userName: "",
          email: "",
          password: ""
        });
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);

    } finally {
      setLoading(false);
    }

  }
  return (
    <div className="wraper">
    <div className="container">
      <div className="login-box">
        <div className="logo">
          <h1>Logo</h1>
        </div>
        <p className="text">Sign up to see photos and videos from your friends.</p>
        <button className="fb-btn">Log in with Facebook</button>
        <div>OR</div>
        <form onSubmit={signupHandler}>

          <div>
            <span className='form-lable'> Email</span>
            <input type="email"
              name='email'
              value={input.email}
              onChange={changeEventHandler} />
          </div>

          <div>
            <span className='form-lable'>Password</span>
            <input type="password"
              name='password'
              value={input.password}
              onChange={changeEventHandler} />
          </div>

          <div>
            <span className='form-lable'>Username</span>
            <input type="text"
              name='userName'
              value={input.userName}
              onChange={changeEventHandler} />
          </div>
          <p>People who use our service may have uploaded your contact information to Instagram. Learn More
          </p>
          <p>By signing up, you agree to our Terms , Privacy Policy and Cookies Policy .</p>
          {
            loading ? (
              <Button>
                <Loader2 className='mr-2 h-4 w-4 animate-spin'/>
                please wait..
              </Button>
            ) : (
              <button className="signup-btn" type='submit'>Login</button>
            )
          }
        </form>

      </div>

      <div className="login">
        <span>Have an account?<Link to="/login">Login</Link></span>
        <div className="get-app">
          <p>Get the app</p>
        </div>
      </div>
    </div>

    </div>
  )
}

export default Signup
