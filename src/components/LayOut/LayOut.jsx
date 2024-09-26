import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

// import style from "./Template.module.css"
export default function LayOut() {

  return (
<>
<Navbar/>

      <Outlet/>

</>

  )
}
