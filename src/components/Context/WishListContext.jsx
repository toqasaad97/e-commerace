import { createContext } from "react";
import PropTypes from "prop-types";


export const WishContext = createContext();

export default function WishContextProvide({ children }) {
  async function WishAdd(productId) {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
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

  async function getWishs() {
    try {
      const res = await fetch("https://ecommerce.routemisr.com/api/v1/wishlist", {
        headers: {
          "Content-Type": "application/json",
          token: localStorage.getItem("token"),
        },
      });

      if (!res.ok) {
        throw new Error("An error occurred while fetching the wishlist");
      }

      const data = await res.json();
      console.log(data);

      return data;
    } catch (error) {
      console.error("Error in getWishs:", error.message);
      return error;
    }
  }

  async function removeWish(productId) {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`, {
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
    <WishContext.Provider
      value={{
        WishAdd,
        getWishs,
        removeWish

      }}
    >
      {children}
    </WishContext.Provider>
  );
}

WishContextProvide.propTypes = {
  children: PropTypes.node.isRequired,
};
