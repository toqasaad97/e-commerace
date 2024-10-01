import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import { ContextToken } from "../Context/ContextToken";

const Navbar = () => {
  const { token } = useContext(ContextToken);
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[#f5e1da] sticky top-0 left-0 right-0 z-50 shadow-md border-b-2 border-[#e0b8a1] py-5 px-8 lg:px-16 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-serif font-bold text-[#2c3e50]">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className={`lg:flex items-center space-x-10 ${isOpen ? "block" : "hidden"} lg:block justify-center`}>
        {token ? (
          <>
            <Link to="/about" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">About</Link>
            <Link to="/services" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Services</Link>
            <Link to="/contact" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Contact</Link>
            <Link to="/logout" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Log Out</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Login</Link>
            <Link to="/signup" className="bg-[#3498db] text-white px-5 py-2 rounded-full text-lg font-serif font-medium hover:bg-[#2980b9] transition-colors duration-300">Sign Up</Link>
          </>
        )}
      </div>

      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-[#2c3e50] focus:outline-none text-2xl">☰</button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#f5e1da] bg-opacity-90 p-5 flex flex-col items-center justify-center space-y-4 z-50">
          {token ? (
            <>
              <Link to="/about" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">About</Link>
              <Link to="/services" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Services</Link>
              <Link to="/contact" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Contact</Link>
              <Link to="/logout" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Login</Link>
              <Link to="/signup" className="bg-[#3498db] text-white px-5 py-2 rounded-full text-lg font-serif hover:bg-[#2980b9] transition-colors duration-300">Sign Up</Link>
            </>
          )}
          <button onClick={toggleMenu} className="text-red-500 mt-4">Close</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
