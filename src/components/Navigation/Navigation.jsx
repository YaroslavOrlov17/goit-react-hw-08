import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import clsx from "clsx";

const buildLinkClass = ({ isActive }) => {
  return clsx(s.navLink, isActive && s.active);
};

const Navigation = () => {
  const isLogedIn = useSelector(selectIsLoggedIn)
  return (
    <nav className={s.nav}>
        <NavLink className={buildLinkClass} to="/">Home</NavLink>
        {isLogedIn && <NavLink className={buildLinkClass} to="/contacts">Contacts</NavLink>} 
      </nav>
  )
}
export default Navigation