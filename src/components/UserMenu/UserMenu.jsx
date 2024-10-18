import s from './UserMenu.module.css'

const UserMenu = () => {
  return (
    <div className={s.userMenu}>
        <p>Welcome, User !</p>
        <button>Logout</button>
    </div>
  )
}
export default UserMenu