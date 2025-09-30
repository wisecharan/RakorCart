import { Link, useNavigate } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import {
  useGetProductsQuery,
  useDeleteProductMutation,
  useCreateProductMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery();
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  const createProductHandler = async () => {
    if (window.confirm('Are you sure you want to create a new product?')) {
      try {
        const newProduct = await createProduct().unwrap();
        navigate(`/admin/product/${newProduct._id}/edit`);
      } catch (err) {
        toast.error(err?.data?.message || err.error);
      }
    }
  };

  return (
    <div className="container mx-auto px-4">
      <div className="flex justify-between items-center my-4">
        <h1 className="text-3xl font-bold text-white">Products</h1>
        <button
          onClick={createProductHandler}
          className="bg-blue-600 text-white font-bold py-2 px-4 rounded hover:bg-blue-700"
          disabled={loadingCreate}
        >
          <FaEdit className="inline-block mr-2" /> Create Product
        </button>
      </div>

      {loadingCreate && <p>Creating Product...</p>}
      {loadingDelete && <p>Deleting Product...</p>}

      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr className="bg-gray-700">
                <th className="py-2 px-4 text-left">ID</th>
                <th className="py-2 px-4 text-left">NAME</th>
                <th className="py-2 px-4 text-left">PRICE</th>
                <th className="py-2 px-4 text-left">CATEGORY</th>
                <th className="py-2 px-4 text-left">BRAND</th>
                <th className="py-2 px-4"></th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id} className="border-b border-gray-700 hover:bg-gray-700">
                  <td className="py-2 px-4">{product._id}</td>
                  <td className="py-2 px-4">{product.name}</td>
                  <td className="py-2 px-4">${product.price}</td>
                  <td className="py-2 px-4">{product.category}</td>
                  <td className="py-2 px-4">{product.brand}</td>
                  <td className="py-2 px-4 flex justify-center space-x-2">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="text-white hover:text-blue-400">
                        <FaEdit />
                      </button>
                    </Link>
                    <button
                      onClick={() => deleteHandler(product._id)}
                      className="text-red-500 hover:text-red-400"
                      disabled={loadingDelete}
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

export default ProductListScreen;