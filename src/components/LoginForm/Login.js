import './Login.css';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { loginUser, registerUser } from '../../redux/slices/userSlice';
import logo from '../../assets/vespa_v1.png';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isMember, setIsMember] = useState(true);

  const dispatch = useDispatch();
  const { isLoading, user } = useSelector((store) => store.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === 'username') {
      setUsername(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.error('Please fill out all fields');
      return;
    }

    if (isMember) {
      dispatch(loginUser({ username, password }));
    } else {
      dispatch(registerUser({ username, password }));
    }
  };

  const toggleMember = () => {
    setIsMember(!isMember);
  };

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/homepage');
      }, 1000);
    }
  }, [user, navigate]);

  return (
    <form onSubmit={onSubmit} className="form">
      <img src={logo} className="logo" alt="logo" />
      <h3>{isMember ? 'Login' : 'Register'}</h3>
      <div className="form-row">
        <label htmlFor="username" className="form-label">
          Username:
          <input
            type="text"
            value={username}
            name="username"
            onChange={handleChange}
            className="form-input"
          />
        </label>
        <label htmlFor="password" className="form-label">
          Password:
          <input
            type="password"
            value={password}
            name="password"
            onChange={handleChange}
            className="form-input"
          />
        </label>
      </div>
      <button type="submit" className="btn btn-block" disabled={isLoading}>
        {isLoading ? 'Loading' : 'Submit'}
      </button>
      <p>
        {isMember ? 'Not a member yet?' : 'Already a member?'}
        <button type="button" onClick={toggleMember} className="member-btn">
          {isMember ? 'Register' : 'Login'}
        </button>
      </p>
    </form>
  );
};

export default Login;
