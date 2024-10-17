import { createContext } from "react";
import PropTypes from "prop-types";

export const CartContext = createContext();

export default function CartContextProvide({ children }) {
  async function cartAdd(productId) {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
        body: JSON.stringify({ productId }),
      });

      if (!res.ok) {
        throw new Error(
          "An error occurred while adding the product to the cart"
        );
      }

      const data = await res.json();
      console.log(data);

      return true;
    } catch (error) {
      console.error("Error in cartAdd:", error.message);
      return false;
    }
  }

  async function getProducts() {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/cart", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      if (!res.ok) {
        throw new Error(
          "An error occurred while adding the product to the cart"
        );

      }

      const data = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error in cartAdd:", error.message);
      return error;
    }
  }
  async function removeCart(productId) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });
      return res.ok;
    } catch (error) {
      console.error("Error removing from wishlist:", error);
      return false;
    }
  }
  return (
    <CartContext.Provider
      value={{
        cartAdd,
        getProducts,
        removeCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

CartContextProvide.propTypes = {
  children: PropTypes.node.isRequired,
};
