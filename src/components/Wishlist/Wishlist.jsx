import { useContext } from "react";
import LoaderComponent from "../Loader/Loader";
import { WishContext } from "../Context/WishListContext";
import { useQuery } from "react-query";
import { CartContext } from "../Context/CartContext";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Wishlist = () => {
  const { getWishs, removeWish } = useContext(WishContext);
  const { cartAdd } = useContext(CartContext);
  const { data, isLoading } = useQuery(["wishlist"], getWishs);

  if (isLoading) return <LoaderComponent />;

  async function handleAddProducts(productId) {
    const add = await cartAdd(productId);
    if (add) {
      toast.success("Product added successfully", {
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
      toast.error("Error occurred", {
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

  async function handleRemoveProduct(productId) {
    const removed = await removeWish(productId);
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
if(!data?.data?.length){
  return(
    <p className="text-center text-3xl font-semibold h-screen  pt-6 text-[#713200]">
    Your wish list is empty.
  </p>
  )
}
  return (
    <>
      {data && data.data && (
        <div className="bg-[#F5E1DA]">
          <div className="px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 mx-auto pb-5">
            {data.data.map((product) => (
              <div
                key={product._id}
                className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow"
              >
                <Link
                  to={`/productsDetalis/${product._id}`}
                  onClick={() => {
                    localStorage.setItem("productId", product._id);
                  }}
                >
                  <img
                    className="p-8 rounded-t-lg"
                    src={product.imageCover}
                    alt={product.title}
                  />
                </Link>
                <div className="px-5 pb-5">
                  <Link to={`/productsDetalis/${product._id}`}>
                    <h3 className="text-xl font-semibold tracking-tight text-gray-900">
                      {product.title?.split(" ").slice(0, 3).join(" ")}
                    </h3>
                    <h6 className="text-xl font-semibold tracking-tight text-[#f39c12]">
                      {product.category.name?.split(" ").slice(0, 3).join(" ")}
                    </h6>
                  </Link>

                  <div className="flex items-center justify-between py-3">
                    <span className="text-3xl font-bold text-gray-900">
                      {product.price} EGP
                    </span>
                    <Link
                      to="#"
                      className="text-white bg-[#f39c12] hover:bg-[#e67e22] focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                      onClick={() => handleAddProducts(product._id)}
                    >
                      Add to cart
                    </Link>
                  </div>

                  <button
                    className="mt-2 text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                    onClick={() => handleRemoveProduct(product._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Wishlist;
