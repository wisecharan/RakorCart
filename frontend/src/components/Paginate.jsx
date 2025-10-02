import { Link } from 'react-router-dom';

const Paginate = ({ pages, page, keyword = '' }) => {
  return (
    pages > 1 && (
      <div className="flex space-x-2">
        {[...Array(pages).keys()].map((x) => (
          <Link
            key={x + 1}
            to={keyword ? `/search/${keyword}/page/${x + 1}` : `/page/${x + 1}`}
            className={`px-4 py-2 rounded ${
              x + 1 === page
                ? 'bg-blue-600 text-white font-bold'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {x + 1}
          </Link>
        ))}
      </div>
    )
  );
};

export default Paginate;