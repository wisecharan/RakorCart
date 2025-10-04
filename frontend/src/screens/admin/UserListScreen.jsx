import { Link } from 'react-router-dom';
import { FaTrash, FaEdit, FaCheck, FaTimes } from 'react-icons/fa';
import { useGetUsersQuery, useDeleteUserMutation } from '../../slices/usersApiSlice';
import { toast } from 'react-toastify';

const UserListScreen = () => {
  const { data: users, refetch, isLoading, error } = useGetUsersQuery();
  const [deleteUser, { isLoading: loadingDelete }] = useDeleteUserMutation();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await deleteUser(id);
        toast.success('User deleted');
        refetch();
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4 text-text-dark">
      <h1 className="text-3xl font-bold my-6">Users</h1>
      {loadingDelete && <p>Deleting...</p>}
      {isLoading ? ( <p>Loading...</p> ) : error ? ( <p className="text-red-500">{error?.data?.message || error.error}</p> ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-border-light">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">NAME</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">EMAIL</th>
                <th className="py-3 px-4 text-center text-xs font-medium text-gray-500 uppercase">ADMIN</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {users.map((user) => (
                <tr key={user._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{user._id}</td>
                  <td className="py-3 px-4 text-sm">{user.name}</td>
                  <td className="py-3 px-4 text-sm"><a href={`mailto:${user.email}`} className="text-primary hover:underline">{user.email}</a></td>
                  <td className="py-3 px-4 text-center">
                    {user.isAdmin ? ( <FaCheck className="text-green-500 mx-auto" /> ) : ( <FaTimes className="text-red-500 mx-auto" /> )}
                  </td>
                  <td className="py-3 px-4 text-right">
                    <button onClick={() => deleteHandler(user._id)} className="text-gray-500 hover:text-red-500">
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UserListScreen;