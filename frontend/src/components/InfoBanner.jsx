import { FaShippingFast, FaHeadset, FaShieldAlt, FaUsers } from 'react-icons/fa';

const InfoBanner = () => {
    const items = [
        { icon: <FaShippingFast size={32} />, text: "Fast Shipping" },
        { icon: <FaHeadset size={32} />, text: "24/7 Support" },
        { icon: <FaShieldAlt size={32} />, text: "Secure Shopping" },
        { icon: <FaUsers size={32} />, text: "1M+ Customers" },
    ];

    return (
        <section className="py-12 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {items.map(item => (
                        <div key={item.text} className="flex flex-col items-center p-6 bg-white rounded-lg border border-gray-100 hover:border-gray-200 transition-all duration-300 hover:shadow-md">
                            <div className="text-gray-700 mb-3">{item.icon}</div>
                            <p className="font-semibold text-gray-900 text-sm md:text-base">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InfoBanner;