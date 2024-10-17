import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayOut from "./components/LayOut/LayOut";
import Login from "./components/Login/Login";
import ContextTokenProvider from "./components/Context/ContextToken";
import Home from "./components/Home/Home";
import ForgetPassword from "./components/ForgetPassword/ForgetPassword";
import ResetPassword from "./components/ResetPassword/ResetPassword";
import Verify from "./components/Verify/Verify";
import SignUp from "./components/SiginUp/SiginUp";
import { QueryClient, QueryClientProvider } from "react-query";
import ProductsDetalis from "./components/ProductsDetalis/ProductsDetalis";
import SubCate from "./components/SubCate/SubCate";
import { Toaster } from "react-hot-toast";
import CartContextProvide from './components/Context/CartContext';
import { ToastContainer } from "react-toastify";
import Cart from "./components/Cart/Cart";
import Payment from "./components/Payment/Payment";
import { Offline } from "react-detect-offline";
import SpeciaSubCate from "./components/SpeciaSubCate/SpeciaSubCate";
import Brand from "./components/Brand/Brand";
import BrandDetalis from "./components/BrandDetalis/BrandDetalis";
import PrivacyPolicy from "./components/PrivacyPolicy/PrivacyPolicy";
import WishContextProvide from "./components/Context/WishListContext";
import WishList from "./components/Wishlist/Wishlist";

const router = createBrowserRouter([
  {
    path: "",
    element: <LayOut />,
    children: [
      { index: true, element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },
      { path: "/forgetPassword", element: <ForgetPassword /> },
      { path: "/verify", element: <Verify /> },
      { path: "/speciaSubCate", element: <SpeciaSubCate /> },
      { path: "/resetPassword", element: <ResetPassword /> },
      { path: "/brand", element: <Brand /> },
      { path: "/productsDetalis/:productId", element: <ProductsDetalis /> },
      { path: "/branddetalis/:brandId", element: <BrandDetalis /> },
      { path: "/subCate/:categoryId", element: <SubCate /> },
      { path: "/cart", element: <Cart /> },
      { path: "/Privacy", element: <PrivacyPolicy /> },
      { path: "/payment/:cartId", element: <Payment /> },
      { path: "/wishlist", element: <WishList /> },
    ],
  },
]);

const queryClient = new QueryClient();

function App() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <WishContextProvide>
          <CartContextProvide>
            <ContextTokenProvider>
              <Toaster />
              <RouterProvider router={router} />
            </ContextTokenProvider>

          </CartContextProvide>
        </WishContextProvide>
      </QueryClientProvider>
      <Offline className="fixed top-0 left-0 w-full h-min-screen bg-red-600 text-white text-center py-2">
        You are offline right now. Check your connection.
      </Offline>
    </>
  );
}

export default App;
