import { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetProductDetailsQuery,
  useUpdateProductMutation,
  useUploadProductImageMutation,
} from '../../slices/productsApiSlice';
import { toast } from 'react-toastify';

const ProductEditScreen = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const { data: product, isLoading, error } = useGetProductDetailsQuery(productId);
  const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

  useEffect(() => {
    if (product) {
      setName(product.name);
      setPrice(product.price);
      setImage(product.image);
      setBrand(product.brand);
      setCategory(product.category);
      setCountInStock(product.countInStock);
      setDescription(product.description);
    }
  }, [product]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await updateProduct({
        productId,
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product updated successfully');
      navigate('/admin/productlist');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };
  
  const uploadFileHandler = async (e) => {
    const formData = new FormData();
    formData.append('image', e.target.files[0]);
    try {
      const res = await uploadProductImage(formData).unwrap();
      toast.success(res.message);
      setImage(res.imageUrl);
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <div className="container mx-auto px-4 text-text-dark">
      <Link to="/admin/productlist" className="inline-block my-4 text-primary font-semibold hover:underline">
        &larr; Go Back
      </Link>
      <div className="flex justify-center">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md border border-border-light">
          <h1 className="text-3xl font-bold text-center">Edit Product</h1>
          {loadingUpdate && <p>Updating...</p>}
          {isLoading ? (
            <p>Loading form...</p>
          ) : error ? (
            <p className="text-red-500">{error?.data?.message || error.error}</p>
          ) : (
            <form onSubmit={submitHandler} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Price</label>
                <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Image</label>
                <input type="text" value={image} onChange={(e) => setImage(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
                <input type="file" onChange={uploadFileHandler} className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover"/>
                {loadingUpload && <p>Uploading...</p>}
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Brand</label>
                <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Category</label>
                <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Count In Stock</label>
                <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              </div>
              <button type="submit" className="w-full py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover">
                Update Product
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductEditScreen;