import { createBrowserRouter, RouterProvider } from "react-router-dom"
import LayOut from "./components/LayOut/LayOut"
import Login from "./components/Login/Login"



  const router =createBrowserRouter([
    {path:'', element: <LayOut/> ,children:[
      {index:true , element:<Login/>}
    ]}
  ]

  )
function App() {

  return (

    <>
    <RouterProvider router={router}/>


    </>
  )
}

export default App
