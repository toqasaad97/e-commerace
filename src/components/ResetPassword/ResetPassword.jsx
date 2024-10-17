import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";

const initialValues = {
  email: "",
  newPassword: "",
};

const ResetPassword = () => {
 const navigate= useNavigate();
  async function reset(values) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/resetPassword",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify({ email: values.email  , newPassword: values.newPassword}),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "An error occurred during login");
      }
      localStorage.setItem("token", data.token);
      navigate("/login");

    } catch (error) {
      console.log(error);
    }
  }
  const myForm = useFormik({
    initialValues,
    validationSchema: yup.object().shape({
      email: yup
        .string()
        .email("Invalid email")
        .required("The email is required"),
        newPassword: yup
        .string()
        .matches(/^[A-Z][a-z0-9]{5,}$/, "Invalid password")
        .required("The password is required"),
    }),
    onSubmit: reset,
  });

  return (
    <section className="bg-[#f5e1da] pt-0 lg:pt-10 md:pt-40 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2c3e50] py-3 text-center">
          New Password
        </h3>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={myForm.handleSubmit}
            >
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-[#2c3e50]"
                >
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-[#e0b8a1] text-[#2c3e50] text-sm rounded-lg focus:ring-[#f39c12] focus:border-[#f39c12] block w-full p-2.5"
                  placeholder="name@company.com"
                  required
                  onChange={myForm.handleChange}
                  onBlur={myForm.handleBlur}
                  value={myForm.values.email}
                />
                {myForm.errors.email && myForm.touched.email ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
                    role="alert"
                  >
                    {myForm.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="newPassword"
                  className="block mb-2 text-sm font-medium text-[#2c3e50]"
                >
                  new Password
                </label>
                <input
                  type="password"
                  name="newPassword"
                  id="newPassword"
                  className="bg-gray-50 border border-[#e0b8a1] text-[#2c3e50] text-sm rounded-lg focus:ring-[#f39c12] focus:border-[#f39c12] block w-full p-2.5"
              
                  required
                  onChange={myForm.handleChange}
                  onBlur={myForm.handleBlur}
                  value={myForm.values.newPassword}
                />
                {myForm.errors.newPassword && myForm.touched.newPassword ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
                    role="alert"
                  >
                    {myForm.errors.newPassword}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#f39c12] hover:bg-[#e67e22] focus:ring-4 focus:outline-none focus:ring-[#f39c12] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Send Reset
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResetPassword;
