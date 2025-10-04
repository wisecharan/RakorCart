import { Link } from "react-router-dom";

const categories = [
    { name: "Lip Balm", subtext: "Organic and Natural", img: "https://images.pexels.com/photos/2533266/pexels-photo-2533266.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Spices", subtext: "Freshly Crushed", img: "https://images.pexels.com/photos/952993/pexels-photo-952993.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Sweetener & Salt", subtext: "No Added Sugar", img: "https://images.pexels.com/photos/3621168/pexels-photo-3621168.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
    { name: "Sweet & Snacks", subtext: "Preservative free", img: "https://images.pexels.com/photos/4016503/pexels-photo-4016503.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" },
];

const CategoryShowcase = () => {
  return (
    <section className="bg-orange-500 py-16"> {/* Use bg-orange-500 as per the image */}
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-white mb-10">Shop Our Category</h2> {/* Title is white as per image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link to={`/search/${category.name}`} key={category.name}>
              <div className="relative overflow-hidden rounded-lg shadow-lg group cursor-pointer">
                {/* Image */}
                <img
                  src={category.img}
                  alt={category.name}
                  className="w-full h-72 object-cover transform transition-transform duration-300 group-hover:scale-105"
                />
                {/* Text Overlay */}
                <div className="absolute inset-x-0 bottom-0 bg-white bg-opacity-90 p-4 text-center">
                  <h3 className="font-semibold text-text-dark text-lg">{category.name}</h3>
                  <p className="text-gray-600 text-sm">{category.subtext}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoryShowcase;