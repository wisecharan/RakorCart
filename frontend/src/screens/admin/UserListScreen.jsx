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
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold my-4 text-white">Users</h1>
      {loadingDelete && <p>Deleting...</p>}
      {isLoading ? ( <p>Loading...</p> ) : error ? ( <p className="text-red-500">{error?.data?.message || error.error}</p> ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">NAME</th>
                <th className="py-2 px-4 text-left">EMAIL</th>
                <th className="py-2 px-4 text-center">ADMIN</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2 px-4">{user._id}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4"><a href={`mailto:${user.email}`}>{user.email}</a></td>
                  <td className="py-2 px-4 text-center">
                    {user.isAdmin ? (
                      <FaCheck className="text-green-500 mx-auto" />
                    ) : (
                      <FaTimes className="text-red-500 mx-auto" />
                    )}
                  </td>
                  <td className="py-2 px-4">
                    <button
                      onClick={() => deleteHandler(user._id)}
                      className="text-red-500 hover:text-red-400"
                    >
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