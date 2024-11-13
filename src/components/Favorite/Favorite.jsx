import { useDispatch, useSelector } from "react-redux"
import { toggleShow } from "../../redux/contacts/slice"
import { selectShowFavorites } from "../../redux/contacts/selectors"
import { FaRegStar,FaStar } from "react-icons/fa6";
import s from "./Favorite.module.css"
import clsx from "clsx"

import MobAddContact from "../MobAddContact/MobAddContact";

const Favorite = () => {

  const isActive = useSelector(selectShowFavorites)

  const dispatch = useDispatch()
  
  return (
    <div className={s.btnBox}>
        <button className={clsx(s.favBtn,isActive && s.active)} onClick={()=> dispatch(toggleShow())}>
          <span>Favorite</span>
          {isActive ? <FaStar size="20" /> : <FaRegStar size="20"/>}</button>
      <MobAddContact/>  
    </div>
  )
}
export default Favorite