import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCreateProductMutation, useUploadProductImageMutation } from '../../slices/productsApiSlice';

const ProductAddScreen = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState(0);
  const [image, setImage] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState('');
  const [countInStock, setCountInStock] = useState(0);
  const [description, setDescription] = useState('');

  const [createProduct, { isLoading: loadingCreate }] = useCreateProductMutation();
  const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await createProduct({
        name,
        price,
        image,
        brand,
        category,
        countInStock,
        description,
      }).unwrap();
      toast.success('Product created successfully');
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
    <>
      <Link to="/admin/productlist" className="inline-block mb-6 text-primary font-semibold hover:underline">
        &larr; Go Back
      </Link>
      <div className="flex justify-center">
        <div className="w-full max-w-lg p-8 space-y-6 bg-white rounded-lg shadow-md border border-border-light">
          <h1 className="text-3xl font-bold text-center">Add Product</h1>
          {loadingCreate && <p>Creating...</p>}
          <form onSubmit={submitHandler} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} required className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Price</label>
              <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} required className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Image</label>
              <input type="text" value={image} onChange={(e) => setImage(e.target.value)} placeholder="Enter image URL or upload" className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
              <input type="file" onChange={uploadFileHandler} className="mt-2 w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary file:text-white hover:file:bg-primary-hover cursor-pointer"/>
              {loadingUpload && <p>Uploading image...</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Brand</label>
              <input type="text" value={brand} onChange={(e) => setBrand(e.target.value)} required className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Category</label>
              <input type="text" value={category} onChange={(e) => setCategory(e.target.value)} required className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Count In Stock</label>
              <input type="number" value={countInStock} onChange={(e) => setCountInStock(e.target.value)} required className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Description</label>
              <textarea rows="3" value={description} onChange={(e) => setDescription(e.target.value)} required className="w-full px-3 py-2 mt-1 bg-gray-50 border border-gray-300 rounded-md"/>
            </div>
            <button type="submit" className="w-full py-2 font-semibold text-white bg-primary rounded-md hover:bg-primary-hover">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ProductAddScreen;