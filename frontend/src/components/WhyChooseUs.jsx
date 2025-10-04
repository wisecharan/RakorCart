const featureCards = [
  {
    imgSrc: "https://images.pexels.com/photos/128402/pexels-photo-128402.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Pure and Clean Ingredients",
    description: "Enjoy the peace of mind that comes from consuming food free from harmful chemicals, pesticides, and artificial additives.",
  },
  {
    imgSrc: "https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Farm-to-Table Freshness",
    description: "Enjoy the vibrant flavor and superior quality of food that has been carefully harvested and brought straight to your doorstep.",
  },
  {
    imgSrc: "https://images.pexels.com/photos/4057753/pexels-photo-4057753.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Nutritional Excellence",
    description: "Our products are packed with essential nutrients, vitamins, and minerals, providing customers with optimal nutrition.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-16">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold text-text-dark mb-10">Why Choose US</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featureCards.map((card, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden border border-border-light">
              <img src={card.imgSrc} alt={card.title} className="w-full h-56 object-cover" />
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2 text-primary">{card.title}</h3>
                <p className="text-gray-600 text-sm">{card.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;