import axios from 'axios';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { Button } from './ui/button';
import { Loader2 } from 'lucide-react';

const login = () => {

  const [input, setInput] = useState({
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
      const res = await axios.post('http://localhost:8080/api/v1/user/login', input, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true
      });
      if (res.data.success) {
        navigate("/")
        toast.success(res.data.message)
        setInput({
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
        <span>Don't have an account?<Link to="/signup">Signup</Link></span>
        <div className="get-app">
          <p>Get the app</p>
        </div>
      </div>
    </div>
  )
}

export default login 
