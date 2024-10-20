import s from "./AppBar.module.css"
import AuthNav from "../AuthNav/AuthNav"
import Navigation from "../Navigation/Navigation"
import UserMenu from "../UserMenu/UserMenu"
import { useSelector } from "react-redux"
import { selectIsLoggedIn } from "../../redux/auth/selectors"

const AppBar = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <div className={s.AppBarBox}>
      <header className={s.header} >
      <Navigation/>
      {isLoggedIn ? <UserMenu/> : <AuthNav/> }
    </header>
    </div>
  )
}
export default AppBar



