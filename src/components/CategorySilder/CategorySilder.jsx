import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import LoaderComponent from "../Loader/Loader";

export default function CategorySlider() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 7,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 640,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
        },
      },
    ],
  };

  async function fetchCategory() {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/categories"
      );
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message);
      }
      return data.data;
    } catch (error) {
      console.log(error);
    }
  }

  const { data, isLoading } = useQuery({
    queryKey: ["category"],
    queryFn: fetchCategory,
  });
  if (isLoading) {
    return <LoaderComponent />;
  }

  return (
    <div className="relative pt-10 mb-10 px-2 overflow-hidden">
      <Slider {...settings}>
        {data
          ? data.map((item) => (
              <Link
                to={`/subcate/${item._id}`}
                key={item._id}
                className="flex flex-col items-center p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 w-full sm:w-48 md:w-56 lg:w-64 mb-4 cursor-pointer"
              >
                <img
                  className="w-32 h-32 sm:w-36 sm:h-36 md:w-40 md:h-40 object-cover rounded-md"
                  src={item.image}
                  alt={item.name}
                />
                <p className="mt-2 text-gray-700 text-sm font-semibold text-center truncate">
                  {item.name}
                </p>
              </Link>
            ))
          : null}
      </Slider>
    </div>
  );
}
