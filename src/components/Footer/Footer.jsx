import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-[#f5e1da] shadow-md py-10 border-t-2 border-[#e0b8a1]">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
        <div>
          <h2 className="text-lg font-bold text-[#713200] mb-2">About Us</h2>
          <p className="text-sm text-gray-600">
            We offer a wide range of products at competitive prices, ensuring quality and customer satisfaction.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#713200] mb-2">Contact Us</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li><span className="font-bold text-[#713200]">Phone:</span> +123 456 789</li>
            <li><span className="font-bold text-[#713200]">Email:</span> support@ecommerce.com</li>
          </ul>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[#713200] mb-2">Links</h2>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>
              <Link to="/privacy" className="hover:text-[#f39c12] transition-colors duration-300">
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
      </div>

      <div className="mt-6 text-center text-sm text-gray-500">
        © 2024 eCommerce Inc. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
