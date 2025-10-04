import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div
      className="relative bg-cover bg-center h-[70vh] rounded-lg overflow-hidden mb-16"
      style={{ backgroundImage: "url('https://images.pexels.com/photos/2284169/pexels-photo-2284169.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')" }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <div className="container mx-auto px-6 h-full flex flex-col justify-center items-start relative">
        <div className="max-w-lg text-white">
          <h1 className="text-4xl md:text-6xl font-bold uppercase tracking-wider">
            Start's at just
          </h1>
          <p className="text-6xl md:text-8xl font-extrabold my-4">
            ₹925/
          </p>
          <Link to="/products">
            <button className="bg-white text-primary-hover font-bold py-3 px-8 rounded-md hover:bg-gray-200 transition-colors duration-300">
              SHOP NOW
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;