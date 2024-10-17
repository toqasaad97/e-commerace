import { useQuery } from "react-query";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LoaderComponent from "../Loader/Loader";
import { Link } from "react-router-dom";

export default function Brand() {

  async function productData() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/brands"
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

  const { data, isError, isLoading } = useQuery({
    queryKey: ["brand"],
    queryFn: productData,
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (isError) {
    return <h1>{ "An error occurred"}</h1>;
  }
console.log(data);

  return (
    <div className="bg-[#F5E1DA]">

      <div className="px-5 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 mt- mx-auto pt-4">
        {data?.map((product) => (
          <div
            key={product._id}
            className="w-full max-w-sm mx-auto bg-white border border-gray-200 rounded-lg shadow"
          >
            <Link to={`/branddetalis/${product._id}`} onClick={() => {
              localStorage.setItem("productId", product._id);
            }}>
              <img
                className="p-8 rounded-t-lg"
                src={product.image}
                alt={product.name}
              />
            </Link>
            <div className="px-5 pb-5">
              <Link to={`/branddetalis/${product._id}`}>
                <h3 className="text-xl text-center font-semibold tracking-tight text-gray-900">
                  {product.name}
                </h3>

              </Link>


            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
