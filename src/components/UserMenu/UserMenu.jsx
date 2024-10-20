import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations'

const UserMenu = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()
  return (
    <div className={s.userMenu}>
        <p className={s.userName}><span>Welcome, {user.name}!</span></p>
        <button onClick={()=> dispatch(logout())}>Logout</button>
    </div>
  )
}
export default UserMenu