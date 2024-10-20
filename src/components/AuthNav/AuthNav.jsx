import { NavLink } from "react-router-dom"
import s from "./AuthNav.module.css"
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};


const AuthNav = () => {
  return (
    <div className={s.login}>
      <NavLink className={buildLinkClass} to="/login">Login</NavLink>
      <NavLink className={buildLinkClass} to="/register">Register</NavLink>
      </div>
  )
}
export default AuthNav