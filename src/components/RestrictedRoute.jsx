import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../redux/auth/selectors"
import { Navigate } from "react-router-dom"

export const RestrictedRoute = ({component:Component,redirectTo}) =>{
    const isLogedIn = useSelector(selectIsLoggedIn)
    return isLogedIn ?  <Navigate to={redirectTo} /> : Component
}
