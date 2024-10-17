import { useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../Loader/Loader";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export default function SpeciaSubCate() {
  const { cartAdd } = useContext(CartContext);

  async function handleAddProducts(productId) {
    const add = await cartAdd(productId);
    if (add) {
      toast.success("Product added successfully", {
        position: "top-center",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    } else {
      toast.error("Error occurred", {
        position: "top-center",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        },
      });
    }
  }

  async function productData() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "An error occurred");
      }
      return data.data;
    } catch (error) {
      toast.error(error.message || "Error occurred", {
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

  const { data, isError, isLoading, error } = useQuery({
    queryKey: ["allProducts"],
    queryFn: productData,
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (isError) {
    return <h1>{error?.message || "An error occurred"}</h1>;
  }

  return (
    <div className="bg-[#F5E1DA]">
      <div className="px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 pt-4 mx-auto">
        {data?.map((product) => (
          <div
            key={product._id}
            className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow"
          >
            <Link to={`/productsDetalis/${product._id}`} onClick={() => {
              localStorage.setItem("productId", product._id);
            }}>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}