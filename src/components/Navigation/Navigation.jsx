import { NavLink } from "react-router-dom"
import s from "./Navigation.module.css"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"

const Navigation = () => {
  const isLogedIn = useSelector(selectIsLoggedIn)
  return (
    <nav className={s.nav}>
        <NavLink to="/">Home</NavLink>
        {isLogedIn && <NavLink to="/contacts">Contacts</NavLink>} 
      </nav>
  )
}
export default Navigation