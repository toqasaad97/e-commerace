import { useParams } from "react-router-dom";
import { useQuery } from "react-query";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import LoaderComponent from "../Loader/Loader";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

const ProductDetails = () => {
  const { productId } = useParams();
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
        }
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
        }
      });
    }
  }

  async function fetchProduct() {
    try {
      const res = await fetch(`https://ecommerce.routemisr.com/api/v1/products/${productId}`);
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "An error occurred");
      }

      return data;
    } catch (error) {
      toast.error(error.message || "Error occurred", {
        position: "top-center",
        style: {
          border: '1px solid #713200',
          padding: '16px',
          color: '#713200',
        },
        iconTheme: {
          primary: '#713200',
          secondary: '#FFFAEE',
        }
      });
    }
  }

  const { data, isError, isLoading } = useQuery(['productDetails', productId], fetchProduct);

  if (isLoading) return <LoaderComponent />;

  if (isError) return <h1 className="text-3xl font-bold text-gray-900 mb-4 text-center">An error occurred</h1>;

  return (
    <>
      {data?.data && (
        <div className="bg-[#F5E1DA] min-h-screen py-10 px-5 flex justify-center items-center">
          <div className="w-full max-w-4xl bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            <div className="md:flex">
              <div className="md:w-1/2 mb-6 md:mb-0 flex justify-center items-center">
                <img
                  className="rounded-lg shadow-lg max-h-80"
                  src={data.data.imageCover}
                  alt={data.data.title}
                />
              </div>
              <div className="md:w-1/2 md:ml-6">
                <h1 className="text-3xl font-bold text-gray-900 mb-4">{data.data.title}</h1>
                <p className="text-lg text-gray-700 mb-4">{data.data.description}</p>
                <p className="text-2xl font-semibold text-gray-900 mb-6">{data.data.price} EGP</p>
                <button className="w-full bg-[#f39c12] hover:bg-[#e67e22] text-white font-bold py-2 px-4 rounded-lg shadow-lg" onClick={() => handleAddProducts(data.data._id)}>
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductDetails;
