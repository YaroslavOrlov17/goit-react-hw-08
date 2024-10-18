import s from "./AppBar.module.css"
import AuthNav from "../AuthNav/AuthNav"
import Navigation from "../Navigation/Navigation"
import UserMenu from "../UserMenu/UserMenu"

const AppBar = () => {
  return (
    <div>
      <header className={s.header} >
      <Navigation/>
      <UserMenu/>
      <AuthNav/>
    </header>
    <hr />
    </div>
  )
}
export default AppBar



