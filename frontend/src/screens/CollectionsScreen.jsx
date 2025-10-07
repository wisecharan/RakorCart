import CategoryShowcase from '../components/CategoryShowcase';
import { Link } from 'react-router-dom';

const CollectionsScreen = () => {
  return (
    <div className="container mx-auto">
      {/* We are reusing the component from the homepage */}
      <CategoryShowcase />
    </div>
  );
};

export default CollectionsScreen;