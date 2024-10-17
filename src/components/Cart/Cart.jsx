import { useContext, useEffect, useState } from "react";
import { CartContext } from "../Context/CartContext";
import LoaderComponent from "../Loader/Loader";
import { FaTrashAlt } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Cart = () => {
  const { getProducts ,removeCart} = useContext(CartContext);
  const [cartProduct, setCartProduct] = useState({
    products: [],
    totalPrice: 0,
    itemCount: 0,
    cartId: null,
  });
  const [loading, setLoading] = useState(true);
  const [showLoginPrompt, setShowLoginPrompt] = useState(false);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!token) {
      setShowLoginPrompt(true);
      setLoading(false);
      return;
    }

    const fetchCart = async () => {
      const res = await getProducts();
      const products = res.data.products.map((p) => ({
        ...p,
        count: Number(p.count),
      }));
      setCartProduct({ ...res, products, cartId: res.data.cartId });
      setLoading(false);
    };
    fetchCart();
  }, [getProducts, token]);

  if (loading) return <LoaderComponent />;

  const updateCount = async (id, count) => {
    if (count < 1) return;
    const res = await fetch(
      `https://ecommerce.routemisr.com/api/v1/cart/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ count }),
      }
    );

    if (res.ok) {
      const updatedCart = await res.json();
      const products = updatedCart.data.products.map((p) => ({
        ...p,
        count: Number(p.count),
      }));
      setCartProduct({ ...updatedCart, products });
    }
  };

  const handleCountChange = (id, increment) => {
    const product = cartProduct.products.find((p) => p.product._id === id);
    const newCount = increment
      ? product.count + 1
      : Math.max(1, product.count - 1);
    updateCount(id, newCount);
  };

  async function handleRemoveProduct(productId) {
    const removed = await removeCart(productId);
    if (removed) {
      toast.success("Product removed successfully", {
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    } else {
      toast.error("Error occurred while removing the product", {
        position: "top-center",
        style: {
          border: "1px solid #713200",
          padding: "16px",
          color: "#713200",
        },
        iconTheme: {
          primary: "#713200",
          secondary: "#FFFAEE",
        },
      });
    }
  }

  const clearCart = async () => {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart`, {
      method: "DELETE",
      headers: { token },
    });
    if (res.ok) {
      setCartProduct({
        products: [],
        totalPrice: 0,
        itemCount: 0,
      });
    }
  };


  if (showLoginPrompt) {Cart
    return (
      <section className="bg-[#F5E1DA] flex justify-center items-center h-screen">
        <div className="bg-white rounded-lg shadow-xl p-6 w-[80%] md:w-[50%] text-center">
          <h2 className="text-3xl font-bold text-[#713200] mb-4">
            Please Log In or Register
          </h2>
          <p className="text-lg text-[#713200] mb-6">
            You need to log in to view and manage your cart items.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 bg-[#f39c12] text-white font-semibold rounded-lg shadow-lg hover:bg-[#d98312] transition duration-300 ease-in-out"
            >
              Log In
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-[#e74c3c] text-white font-semibold rounded-lg shadow-lg hover:bg-[#c0392b] transition duration-300 ease-in-out"
            >
              Register
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#F5E1DA]">
      <div className="py-7 w-[90%] md:w-[80%] mx-auto">
        {cartProduct.products.length > 0 ? (
          <>
            <h1 className="text-center text-4xl font-bold text-[#713200] mb-6">
              Cart Shipping
            </h1>
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={clearCart}
                className="flex items-center gap-2 px-4 py-2 bg-[#f39c12] text-white font-semibold rounded-lg shadow-lg hover:bg-[#d98312] transition duration-300 ease-in-out"
              >
                <FaTrashAlt /> Clear Cart
              </button>
              <div className="flex flex-col items-end">
                <h2 className="text-lg font-bold text-[#713200]">
                  Total: {cartProduct.data.totalCartPrice} EGP
                </h2>
                <h2 className="text-lg font-bold text-[#713200]">
                  Items: {cartProduct.numOfCartItems}
                </h2>
              </div>
            </div>

            <div className="grid gap-6">
              {cartProduct.products.map(({ product, count }) => (
                <div
                  key={product._id}
                  className="bg-white border border-[#f39c12] rounded-lg shadow-lg p-4 flex flex-col md:flex-row items-center md:gap-4"
                >
                  <img
                    src={product.imageCover}
                    className="w-24 md:w-32 lg:w-40 rounded-lg shadow-md"
                    alt={product.title}
                  />
                  <div className="flex flex-col items-start">
                    <p className="font-semibold text-[#713200] text-xl">
                      {product.title}
                    </p>
                    <p className="font-semibold text-[#713200] text-lg mb-2">
                      {product.price} EGP
                    </p>
                    <div className="flex items-center mb-2">
                      <button
                        onClick={() => handleCountChange(product._id, false)}
                        className="h-8 w-8 mx-2 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      >
                        -
                      </button>

                      <input
                        type="number"
                        className="w-14 border border-gray-300 text-center rounded-lg"
                        value={count}
                        readOnly
                      />
                      <button
                        onClick={() => handleCountChange(product._id, true)}
                        className="h-8 w-8 mx-2 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300 transition"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => handleRemoveProduct(product._id)}
                      className="text-[#f39c12] hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-6">
              <Link
                to={`/payment/${cartProduct.data._id}`}
                className="px-4 py-2 bg-[#f39c12] text-white font-semibold rounded-lg shadow-lg hover:bg-[#d98312] transition duration-300 ease-in-out"
              >
                Checkout
              </Link>
            </div>
          </>
        ) : (
          <p className="text-center text-3xl font-semibold h-screen  text-[#713200]">
            Your cart is empty.
          </p>
        )}
      </div>
    </section>
  );
};

export default Cart;
