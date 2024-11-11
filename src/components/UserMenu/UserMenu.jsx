import { useDispatch, useSelector } from 'react-redux'
import s from './UserMenu.module.css'
import { selectUser } from '../../redux/auth/selectors'
import { logout } from '../../redux/auth/operations'
import toast from 'react-hot-toast'
import Swal from 'sweetalert2'

const UserMenu = () => {
  const user = useSelector(selectUser)
  const dispatch = useDispatch()

  const handleLogout = () => {
    Swal.fire({
      title: 'Are you sure you want to log out?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Log out',
      cancelButtonText: 'Cancel',
      background: "rgba(255, 255, 255, 0.4)",
      backdrop: " rgba(58, 58, 58, 0.349)",
      buttonsStyling: false, 
      customClass: {
        confirmButton: "confirmBtn", 
        cancelButton: "cancelBtn",   
        popup:" popup",      
      }
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(logout())
        .unwrap()
        .then(()=>{
          toast(`Bye Bye !`, {
            icon: '👋',
            })
        })
      } })
  }

  return (
    <div className={s.userMenu}>
        <p className={s.userName}><span>Welcome, {user.name}!</span></p>
        <button onClick={() => handleLogout()}>Logout</button>
    </div>
  )
}
export default UserMenu