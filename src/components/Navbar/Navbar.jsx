import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import logo from "../../assets/logo.png";
import { ContextToken } from "../Context/ContextToken";

const Navbar = () => {
  const { token, setToken } = useContext(ContextToken);
  const [isOpen, setIsOpen] = useState(false);

  function handleLogout() {
    localStorage.removeItem("token");
    setToken(null);
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-[hsl(16,57%,91%)] sticky top-0 left-0 right-0 z-50 shadow-md border-b-2 border-[#e0b8a1] py-5 px-8 lg:px-16 flex items-center justify-between transition-colors duration-300">
      <div className="flex items-center">
        <Link to="/" className="text-3xl font-serif font-bold text-[#2c3e50]">
          <img src={logo} alt="Logo" />
        </Link>
      </div>

      <div className={`lg:flex items-center space-x-10 ${isOpen ? "block" : "hidden"} lg:block justify-center`}>
        {token ? (
          <>
            <Link to="/wishlist" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">WishList</Link>
            <Link to="/Brand" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Brand</Link>
            <Link to="/" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Products</Link>
            <Link to="/contact" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Contact</Link>
          </>
        ) : (
          <>
            <Link to="/login" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Login</Link>
            <Link to="/signup" className="bg-[#F39C12] text-white px-5 py-2 rounded-full text-lg font-serif font-medium hover:bg-[#E67E22] transition-colors duration-300">Sign Up</Link>
          </>
        )}
      </div>

      <div className="flex items-center">
        <Link to="/cart" className="text-[#2c3e50] relative hover:text-[#f39c12] transition-colors duration-300">
          <FontAwesomeIcon icon={faShoppingCart} size="2x" />
        </Link>
        {token && (
          <Link to="/login" onClick={handleLogout} className="text-[#2c3e50] ml-4 text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">
            Log Out
          </Link>
        )}
      </div>

      <div className="lg:hidden">
        <button onClick={toggleMenu} className="text-[#2c3e50] focus:outline-none text-2xl">☰</button>
      </div>

      {isOpen && (
        <div className="lg:hidden fixed inset-0 bg-[#f5e1da] bg-opacity-90 p-5 flex flex-col items-center justify-center space-y-4 z-50">
          {token ? (
            <>
              <Link to="/wishlist" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">WishList</Link>
              <Link to="/brand" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Brand</Link>
              <Link to="/" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Products</Link>
              <Link to="/contact" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Contact</Link>
              <Link to="/login" onClick={handleLogout} className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Log Out</Link>
            </>
          ) : (
            <>
              <Link to="/login" className="text-[#2c3e50] text-lg font-serif hover:text-[#f39c12] transition-colors duration-300">Login</Link>
              <Link to="/signup" className="bg-[#f39c12] text-white px-5 py-2 rounded-full text-lg font-serif hover:bg-[#E67E22] transition-colors duration-300">Sign Up</Link>
            </>
          )}
          <button onClick={toggleMenu} className="text-red-500 mt-4">Close</button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
