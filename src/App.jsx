import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayOut from "./components/LayOut/LayOut"
import Login from "./components/Login/Login"
import SignUp from "./components/SiginUp/SiginUp"
import ContextTokenProvider from "./components/Context/ContextToken"



  const router =createBrowserRouter([
    {path:'', element: <LayOut/> ,children:[
      {index:true , element:<Login/>},
      {path:"/signup" , element:<SignUp/>}
    ]}
  ]

  )
function App() {

  return (

    <>
    <ContextTokenProvider>
    <RouterProvider router={router}/>
    </ContextTokenProvider>


    </>
  )
}

export default App
