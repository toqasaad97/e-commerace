import { useQuery } from "react-query";
import { Link, useParams } from "react-router-dom";
import LoaderComponent from "../Loader/Loader";

export default function SubCategory() {
  const { categoryId } = useParams();

  const fetchSubCategories = async () => {
    const res = await fetch(`https://ecommerce.routemisr.com/api/v1/categories/${categoryId}/subcategories`, {
      headers: {
        "Content-Type": "application/json",
        "token": localStorage.getItem("token"),
      },
    });

    if (!res.ok) {
      throw new Error("An error occurred while fetching subcategories");
    }

    const data = await res.json();
    return data.data;
  };

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["subCategories", categoryId],
    queryFn: fetchSubCategories,
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return <LoaderComponent />;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  if (!data || data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <h1 className="text-2xl font-semibold text-[#713200] mb-4">No products found</h1>
        <p className="text-gray-600 text-center mb-4">It seems we don’t have any products for this category.</p>
        <svg className="w-24 h-24 text-[#713200] mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4m0 0v4m0-4h4m-4 0H8" />
          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth={2} />
        </svg>
        <button
          className="mt-4 px-4 py-2 bg-[#713200] text-white rounded-md hover:bg-[#a75b3c] transition-colors"
          onClick={() => window.location.reload()}
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <section className="p-5 bg-gradient-to-r from-[#F5E1DA] to-[#F0C5B0] h-screen">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {data.map((subCat) => (
            <Link to={`/SpeciaSubCate`} key={subCat._id}>
              <div
                onClick={() => {
                  localStorage.setItem("subCatname", subCat.name.toLowerCase());
                  localStorage.setItem("subCatId", subCat._id);
                }}
                className="flex flex-col items-center bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
              >
                <h2 className="mt-3 text-lg font-semibold text-[#713200] text-center truncate">
                  {subCat.name}
                </h2>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
