import { FaShippingFast, FaHeadset, FaShieldAlt, FaUsers } from 'react-icons/fa';

const InfoBanner = () => {
    const items = [
        { icon: <FaShippingFast size={32} />, text: "Fast Shipping" },
        { icon: <FaHeadset size={32} />, text: "Customer Support" },
        { icon: <FaShieldAlt size={32} />, text: "Secure Shopping" },
        { icon: <FaUsers size={32} />, text: "60,000+ Customers" },
    ];

    return (
        <section className="py-12 bg-background border-t border-b border-border-light">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                    {items.map(item => (
                        <div key={item.text} className="flex flex-col items-center p-4 bg-white rounded-lg shadow-sm border border-border-light">
                            <div className="text-primary mb-3">{item.icon}</div>
                            <p className="font-semibold text-text-dark">{item.text}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default InfoBanner;