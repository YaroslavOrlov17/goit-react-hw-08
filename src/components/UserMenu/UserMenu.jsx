import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations'
import toast from 'react-hot-toast'

const UserMenu = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(logout())
    .unwrap()
    .then(()=>{
      toast(`Bye Bye !`, {
        icon: '👋',
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.300)',
          color: 'rgb(255, 255, 255)',
        }})
    })
  }

  return (
    <div className={s.userMenu}>
        <p className={s.userName}><span>Welcome, {user.name}!</span></p>
        <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}
export default UserMenu