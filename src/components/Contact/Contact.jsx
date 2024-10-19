import s from "./Contact.module.css"
import {deleteContact} from "../../redux/contacts/operations"
import { useDispatch } from "react-redux"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { openModal } from "../../redux/contacts/slice"

const Contact = ({ contactData,contactData: { name, number, id }}) => {
  const dispatch = useDispatch()

  const handleEditClick = (contact)=>{
    dispatch(openModal(contact))
  }
  return (
    <div className={s.contactBox}>
      <div className={s.infoBox}>
        <p className={s.contactName}>
          <IoPersonCircle className={s.contactIcon} size="25" /> {name}
        </p>
        <p>
          <FaPhoneSquare className={s.contactIcon} size="25" /> {number}
        </p>
      </div>
      <button onClick={() => dispatch(deleteContact(id))}>Delete</button>
      <button onClick={()=> handleEditClick(contactData)}>Edit</button>
    </div>
  )
}

export default Contact
