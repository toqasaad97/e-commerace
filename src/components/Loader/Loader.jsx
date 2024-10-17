
import { RotatingTriangles } from "react-loader-spinner";

function LoaderComponent() {
  return (
<div className="h-screen flex justify-center items-center bg-[#ffb87a9e] ">
<div className="your-wrapper-class">
      <RotatingTriangles
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="rotating-triangles-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
</div>
  );
}

export default LoaderComponent;
