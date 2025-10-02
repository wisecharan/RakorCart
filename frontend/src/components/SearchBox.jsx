import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SearchBox = () => {
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
      setKeyword('');
    } else {
      navigate('/');
    }
  };

  return (
    <form onSubmit={submitHandler} className="flex">
      <input
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        value={keyword}
        placeholder="Search Products..."
        className="text-sm p-2 rounded-l-md bg-gray-700 text-white focus:outline-none w-48"
      />
      <button type="submit" className="p-2 bg-blue-600 rounded-r-md hover:bg-blue-700">
        Search
      </button>
    </form>
  );
};

export default SearchBox;