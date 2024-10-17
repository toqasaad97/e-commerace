import { useFormik } from "formik";
import { useNavigate, useParams, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import * as Yup from "yup";
import { useState } from "react";
import "react-toastify/dist/ReactToastify.css";

const initialData = { details: "", phone: "", city: "" };

export default function Payment() {
  const [paymentMethod, setPaymentMethod] = useState("cash");
  const navigate = useNavigate();
  const { cartId } = useParams();

  const token = localStorage.getItem("token");

  const handlePayment = async () => {
    const url = paymentMethod === "online"
      ? `https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=http://localhost:5173`
      : `https://ecommerce.routemisr.com/api/v1/orders/${cartId}`;

    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          token,
        },
        body: JSON.stringify({ shippingAddress: formik.values }),
      });
      if (!res.ok) throw new Error();
      toast.success("Order placed successfully!");
      if (paymentMethod === "online") {
        const data = await res.json();
        window.open(data.session.url, "_self");
      } else {
        navigate("/allorders");
      }
    } catch {
      toast.error("Order failed");
    }
  };

  const formik = useFormik({
    initialValues: initialData,
    validationSchema: Yup.object({
      details: Yup.string().required("Required"),
      phone: Yup.string().matches(/^\d{11}$/, "Must be 11 digits").required("Required"),
      city: Yup.string().required("Required"),
    }),
    onSubmit: handlePayment,
  });

  if (!token) {
    return (
      <section className="h-screen flex flex-col justify-center items-center bg-gradient-to-r from-[#F5E1DA] to-[#F0C5B0]">
        <div className="bg-white p-8 rounded-lg shadow-lg text-center">
          <h1 className="text-3xl text-[#713200] font-bold mb-6">Access Denied</h1>
          <p className="text-lg text-[#8A4A3D] mb-4">Please log in or register to complete your purchase.</p>
          <Link
            to="/register"
            className="inline-block bg-gradient-to-r from-[#713200] to-[#5a2600] text-white py-3 px-6 rounded-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105 mb-4"
          >
            Register
          </Link>
          <Link
            to="/login"
            className="inline-block bg-gradient-to-r from-[#5a2600] to-[#713200] text-white py-3 px-6 rounded-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
          >
            Login
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="h-screen flex justify-center items-center bg-gradient-to-r from-[#F5E1DA] to-[#F0C5B0]">
      <ToastContainer />
      <div className="max-w-lg w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-3xl text-[#713200] font-bold mb-6 text-center">Payment</h1>
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          <div className="relative">
            <i className="fa fa-shipping-fast absolute left-3 top-1/2 transform -translate-y-1/2 text-[#713200]"></i>
            <input
              type="text"
              name="details"
              placeholder="Shipping Details"
              value={formik.values.details}
              onChange={formik.handleChange}
              className="w-full p-3 pl-10 border rounded-lg"
            />
          </div>
          <div className="relative">
            <i className="fa fa-city absolute left-3 top-1/2 transform -translate-y-1/2 text-[#713200]"></i>
            <input
              type="text"
              name="city"
              placeholder="City"
              value={formik.values.city}
              onChange={formik.handleChange}
              className="w-full p-3 pl-10 border rounded-lg"
            />
          </div>
          <div className="relative">
            <i className="fa fa-phone absolute left-3 top-1/2 transform -translate-y-1/2 text-[#713200]"></i>
            <input
              type="text"
              name="phone"
              placeholder="Phone (11 digits)"
              value={formik.values.phone}
              onChange={formik.handleChange}
              className="w-full p-3 pl-10 border rounded-lg"
            />
          </div>
          <div>
            <label className="text-lg text-[#713200] font-semibold mb-2 block">Payment Method</label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="cash"
                  checked={paymentMethod === "cash"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                /> Cash
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="online"
                  checked={paymentMethod === "online"}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-2"
                /> Online
              </label>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-[#713200] to-[#5a2600] text-white py-3 rounded-lg hover:bg-gradient-to-l transition duration-300 transform hover:scale-105"
          >
            Confirm Order
          </button>
        </form>
      </div>
    </section>
  );
}
