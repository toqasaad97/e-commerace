import { useFormik } from "formik";
import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { ContextToken } from '../Context/ContextToken';

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const { setToken  } = useContext(ContextToken);
  const navigate = useNavigate();
  async function login(values) {
    try {
      const res = await fetch(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...values }),
        }
      );

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || "An error occurred during login");
      }

      setToken(data.token);
      navigate("/");
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
      password: yup
        .string()
        .required("The password is required"),
    }),
    onSubmit: (values) => login(values),
  });

  return (
    <section className="bg-[#f5e1da] pt-0 lg:pt-10 md:pt-40 ">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <h3 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#2c3e50] py-3 text-center">
          Login to Your Account
        </h3>
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" onSubmit={myForm.handleSubmit}>
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-[#2c3e50]">
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
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2" role="alert">
                    {myForm.errors.email}
                  </div>
                ) : null}
              </div>

              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-[#2c3e50]">
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
                  onBlur={myForm.handleBlur}
                  value={myForm.values.password}
                />
                {myForm.errors.password && myForm.touched.password ? (
                  <div className="p-4 mb-4 text-sm text-red-800 rounded-lg bg-red-50 mt-2" role="alert">
                    {myForm.errors.password}
                  </div>
                ) : null}
              </div>

              <button
                type="submit"
                className="w-full text-white bg-[#f39c12] hover:bg-[#e67e22] focus:ring-4 focus:outline-none focus:ring-[#f39c12] font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                Login
              </button>

              <p className="text-sm font-light text-[#2c3e50]">
            Do not have account
                <Link to="/signup" className="font-medium text-[#f39c12] hover:underline">
                  Sign up here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
