import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";

const initialValues = {
  name: "",
  email: "",
  password: "",
  rePassword: "",
  phone: "",
};
const SignUp = () => {
  const navigate = useNavigate();
  async function register(values) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signup",
        {
          method: "POST",
          headers: {
            "content-Type": "application/json",
          },
          body: JSON.stringify({ ...values }),
        }
      );
      console.log(values);
      const data = await res.json();
      console.log(data);
      if (!res.ok) {
        throw new Error(
          data.massage || "an error occurred during registeration "
        );
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
      name: yup
        .string()
        .min(2, "The min letter is two")
        .max(10, "The max letter is 10")
        .required("The name is required"),

      email: yup
        .string()
        .email("Invalid email")
        .required("The email is required"),

      password: yup
        .string()
        .matches(/^[A-Z][a-z0-9]{5,}$/, "Invalid password")
        .required("The password is required"),

      rePassword: yup
        .string()
        .oneOf([yup.ref("password")], "Passwords must match")
        .required("The re-password is required"),

      phone: yup
        .string()
        .matches(/^01[0125][0-9]{8}$/, "Invalid number")
        .required("The phone number is required"),
    }),
    onSubmit: (values) => register(values),
  });

  return (
    <section className="bg-[#f5e1da] pt-0 lg:pt-10 md:pt-40 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2c3e50] py-3 text-center">
          Create Your Account
        </h3>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={myForm.handleSubmit}
            >
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-sm font-medium text-[#2c3e50]"
                >
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  className="bg-gray-50 border border-[#e0b8a1] text-[#2c3e50] text-sm rounded-lg focus:ring-[#f39c12] focus:border-[#f39c12] block w-full p-2.5"
                  placeholder="John Doe"
                  required
                  onChange={myForm.handleChange}
                  onBlur={myForm.handleBlur}
                  value={myForm.values.name}
                />
                {myForm.touched.name && myForm.errors.name ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
                    role="alert"
                  >
                    {myForm.errors.name}
                  </div>
                ) : null}
              </div>

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
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-[#2c3e50]"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-[#e0b8a1] text-[#2c3e50] text-sm rounded-lg focus:ring-[#f39c12] focus:border-[#f39c12] block w-full p-2.5"
                  required
                  onChange={myForm.handleChange}
                  value={myForm.values.password}
                  onBlur={myForm.handleBlur}
                />
                {myForm.errors.password && myForm.touched.password ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
                    role="alert"
                  >
                    {myForm.errors.password}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="rePassword"
                  className="block mb-2 text-sm font-medium text-[#2c3e50]"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  name="rePassword"
                  id="rePassword"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-[#e0b8a1] text-[#2c3e50] text-sm rounded-lg focus:ring-[#f39c12] focus:border-[#f39c12] block w-full p-2.5"
                  required
                  onChange={myForm.handleChange}
                  onBlur={myForm.handleBlur}
                  value={myForm.values.rePassword}
                />
                {myForm.errors.rePassword && myForm.touched.rePassword ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
                    role="alert"
                  >
                    {myForm.errors.rePassword}
                  </div>
                ) : null}
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block mb-2 text-sm font-medium text-[#2c3e50]"
                >
                  Your phone number
                </label>
                <input
                  type="tel"
                  name="phone"
                  id="phone"
                  className="bg-gray-50 border border-[#e0b8a1] text-[#2c3e50] text-sm rounded-lg focus:ring-[#f39c12] focus:border-[#f39c12] block w-full p-2.5"
                  placeholder="+1234567890"
                  required
                  onChange={myForm.handleChange}
                  value={myForm.values.phone}
                  onBlur={myForm.handleBlur}
                />
                {myForm.errors.phone && myForm.touched.phone ? (
                  <div
                    className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2"
                    role="alert"
                  >
                    {myForm.errors.phone}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#f39c12] hover:bg-[#e67e22] focus:ring-4 focus:outline-none focus:ring-[#f39c12] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Create an account
              </button>

              <p className="text-sm font-light text-[#2c3e50]">
                Already have an account?{" "}
                <Link
                  to="#"
                  className="font-medium text-[#f39c12] hover:underline"
                >
                  Login here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SignUp;
