import { NavLink } from "react-router-dom"
import s from "./AuthNav.module.css"

const AuthNav = () => {
  return (
    <div className={s.login}>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      </div>
  )
}
export default AuthNav