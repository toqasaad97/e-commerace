import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#f5e1da] shadow-md py-5 px-8 lg:px-16 flex items-center justify-between">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-serif font-bold text-[#2c3e50]">
          CozyBrand
        </Link>
      </div>

      <div
        className={`lg:flex space-x-10 ${isOpen ? "block" : "hidden"} lg:block`}
      >
        <Link
          to="/about"
          className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
        >
          About
        </Link>
        <Link
          to="/services"
          className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
        >
          Services
        </Link>
        <Link
          to="/contact"
          className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
        >
          Contact
        </Link>
      </div>

      <div
        className={`lg:flex items-center space-x-4 ${
          isOpen ? "block" : "hidden"
        } lg:block`}
      >
        <Link
          to="/login"
          className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="bg-[#3498db] text-white px-5 py-2 rounded-full text-lg font-serif font-medium hover:bg-[#2980b9] transition-colors duration-300"
        >
          Register
        </Link>
      </div>

      <div className="lg:hidden">
        <button
          onClick={toggleMenu}
          className="text-[#2c3e50] focus:outline-none text-2xl"
        >
          ☰
        </button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#f5e1da] bg-opacity-90 p-5 flex flex-col items-center justify-center space-y-4 z-50">
          <Link
            to="/about"
            className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
          >
            About
          </Link>
          <Link
            to="/services"
            className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
          >
            Services
          </Link>
          <Link
            to="/contact"
            className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
          >
            Contact
          </Link>
          <Link
            to="/login"
            className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#3498db] text-white px-5 py-2 rounded-full text-lg font-serif hover:bg-[#2980b9] transition-colors duration-300"
          >
            Register
          </Link>
          <button onClick={toggleMenu} className="text-red-500 mt-4">
            Close
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
