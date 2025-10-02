import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation } from '../slices/usersApiSlice'; // 1. Import the hook
import { setCredentials } from '../slices/authSlice';
import { toast } from 'react-toastify';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [login, { isLoading }] = useLoginMutation(); // 2. Use the hook

  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      // 3. Call the mutation function
      const res = await login({ email, password }).unwrap(); 
      dispatch(setCredentials({ ...res }));
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white">Sign In</h1>
        <form onSubmit={submitHandler} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300">Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>

          <div className="text-right text-sm">
            <Link to="/forgotpassword" className="font-medium text-blue-400 hover:underline">Forgot Password?</Link>
          </div>
          
          <button type="submit" disabled={isLoading} className="w-full px-4 py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500">
            {isLoading ? 'Signing In...' : 'Sign In'}
          </button>
        </form>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            New Customer?{' '}
            <Link to="/register" className="font-medium text-blue-400 hover:underline">Register</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;