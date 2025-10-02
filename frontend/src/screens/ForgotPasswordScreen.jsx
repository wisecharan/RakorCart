import { useState } from 'react';
import { useForgotPasswordMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email }).unwrap();
      toast.success('Password reset email sent. Please check your inbox.');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white">Forgot Password</h1>
        <p className="text-center text-gray-400">Enter your email to receive a password reset link.</p>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500">
            {isLoading ? 'Sending...' : 'Send Reset Link'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordScreen;