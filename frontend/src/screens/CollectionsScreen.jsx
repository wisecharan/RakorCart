import CategoryShowcase from '../components/CategoryShowcase';
import { Link } from 'react-router-dom';

const CollectionsScreen = () => {
  return (
    <div className="container mx-auto">
      <Link to="/" className="inline-block mb-6 text-primary font-semibold hover:underline">
        &larr; Back to Home
      </Link>
      {/* We are reusing the component from the homepage */}
      <CategoryShowcase />
    </div>
  );
};

export default CollectionsScreen;