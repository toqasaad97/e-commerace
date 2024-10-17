import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import LoaderComponent from "../Loader/Loader";

export default function BrandDetalis() {
  const { brandId } = useParams();

  const fetchBrandDetails = async () => {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/brands/${brandId}`, {
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token"),
      },
    });

    if (!res.ok) {
      throw new Error("An error occurred while fetching brand details");
    }

    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["brandDetails", brandId],
    queryFn: fetchBrandDetails,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-[#713200] mb-4">No brand details found</h1>
      </div>
    );
  }

  return (
    <section className="p-10 bg-gradient-to-r from-[#FDEFEF] via-[#F0C5B0] to-[#F2A07B] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="w-[60%]  mx-auto ">
          <Link to={`/SpeciaSubCate`} key={data._id}>
            <div
              onClick={() => {
                localStorage.setItem("brandName", data.name.toLowerCase());
                localStorage.setItem("brandId", data._id);
              }}
              className="group relative bg-white rounded-lg shadow-xl overflow-hidden transition-all transform hover:scale-105"
            >
              <img
                src={data.image}
                alt={data.name}
                className="w-full h-60 object-cover rounded-t-lg transition-transform duration-500 group-hover:scale-110"
              />
              <div className="p-5 flex justify-center items-center h-full">
                <h2 className="text-xl font-bold text-[#8A4A3D] tracking-wide mb-2 group-hover:mb-6 transition-all duration-500">
                  {data.name}
                </h2>
              </div>
              <div className="absolute bottom-0 left-0 right-0 py-3 bg-[#F5E1DA] text-[#8A4A3D] text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 text-center">
                Explore {data.name}
              </div>
            </div>
          </Link>
        </div>
      </div>
    </section>
  );
}
