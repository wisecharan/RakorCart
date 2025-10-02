import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useResetPasswordMutation } from '../slices/usersApiSlice';
import { toast } from 'react-toastify';

const ResetPasswordScreen = () => {
  const { resettoken } = useParams();
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const submitHandler = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    try {
      await resetPassword({ token: resettoken, data: { password } }).unwrap();
      toast.success('Password reset successfully');
      navigate('/login');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="flex justify-center items-center mt-20">
      <div className="w-full max-w-md p-8 space-y-6 bg-gray-800 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-center text-white">Reset Password</h1>
        <form onSubmit={submitHandler} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">New Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Confirm New Password</label>
            <input type="password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required className="w-full px-3 py-2 mt-1 text-white bg-gray-700 border border-gray-600 rounded-md"/>
          </div>
          <button type="submit" disabled={isLoading} className="w-full py-2 font-semibold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-500">
            {isLoading ? 'Resetting...' : 'Reset Password'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordScreen;