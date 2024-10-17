
import { useNavigate } from "react-router-dom"

export default function ProtectRoute() {

const token = localStorage.getItem("token")
const navigate =useNavigate()

if( !token){
  return (
    navigate("/payment")
  )
}

}
