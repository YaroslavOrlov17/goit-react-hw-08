import s from "./Contact.module.css"
import {deleteContact} from "../../redux/contacts/operations"
import { useDispatch } from "react-redux"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { openModal } from "../../redux/contacts/slice"
import toast from "react-hot-toast"

const Contact = ({ contactData,contactData: { name, number, id }}) => {
  const dispatch = useDispatch()

  const handleEditClick = (contact)=>{
    dispatch(openModal(contact))
  }

  const handleDeleteContact = (id) =>{
    dispatch(deleteContact(id))
    .unwrap()
    .then(()=>{
      toast.success("Contact deleted!")
    })
  }
  return (
    <div className={s.contactBox}>
      <div className={s.infoBox}>
        <p className={s.contactName}>
          <IoPersonCircle className={s.contactIcon} size="25" /> {name}
        </p>
        <p className={s.contactName}>
          <FaPhoneSquare className={s.contactIcon} size="25" /> {number}
        </p>
      </div>
      <div className={s.btnBox}>
      <button onClick={()=> handleDeleteContact(id)} className={s.btn}><MdDelete size="25" /></button>
      <button onClick={()=> handleEditClick(contactData)} className={s.btn}><MdEdit size="25" /></button>
      </div>
    </div>
  )
}

export default Contact
