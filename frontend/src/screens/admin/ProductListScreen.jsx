import { Link } from 'react-router-dom';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useGetProductsQuery, useDeleteProductMutation, useCreateProductMutation } from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const ProductListScreen = () => {
  const { data, isLoading, error, refetch } = useGetProductsQuery({});
  const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const navigate = useNavigate();

  const deleteHandler = async (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        toast.success('Product deleted');
        refetch();
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
    <div className="container mx-auto px-4 text-text-dark">
      <div className="flex justify-between items-center my-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button onClick={createProductHandler} className="bg-primary text-white font-bold py-2 px-4 rounded-md hover:bg-primary-hover transition-colors">
          <FaEdit className="inline-block mr-2" /> Create Product
        </button>
      </div>

      {loadingCreate && <p>Creating...</p>}
      {loadingDelete && <p>Deleting...</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error?.data?.message || error.error}</p>
      ) : (
        <div className="overflow-x-auto bg-white rounded-lg shadow-md border border-border-light">
          <table className="min-w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">ID</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">NAME</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">PRICE</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">CATEGORY</th>
                <th className="py-3 px-4 text-left text-xs font-medium text-gray-500 uppercase">BRAND</th>
                <th className="py-3 px-4"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {data.products.map((product) => (
                <tr key={product._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 text-sm font-medium">{product._id}</td>
                  <td className="py-3 px-4 text-sm">{product.name}</td>
                  <td className="py-3 px-4 text-sm">${product.price}</td>
                  <td className="py-3 px-4 text-sm">{product.category}</td>
                  <td className="py-3 px-4 text-sm">{product.brand}</td>
                  <td className="py-3 px-4 flex justify-end space-x-3">
                    <Link to={`/admin/product/${product._id}/edit`}>
                      <button className="text-gray-500 hover:text-primary"><FaEdit size={16} /></button>
                    </Link>
                    <button onClick={() => deleteHandler(product._id)} className="text-gray-500 hover:text-red-500">
                      <FaTrash size={16} />
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