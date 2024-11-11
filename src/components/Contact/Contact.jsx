import s from "./Contact.module.css"
import {deleteContact} from "../../redux/contacts/operations"
import { useDispatch, useSelector } from "react-redux"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { openModal } from "../../redux/contacts/slice"
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import { selectShowFavorites } from "../../redux/contacts/selectors"

const Contact = ({ favContacts,contactData,contactData: { name, number, id },addFavorite}) => {

  const favoriteIsActive = useSelector(selectShowFavorites)
  const dispatch = useDispatch()

  const handleEditClick = (contact)=>{
    dispatch(openModal(contact))
  }

  const handleDeleteContact = (id) =>{
      Swal.fire({
        title: `Are you sure you want to delete the contact "${name}"?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Delete',
        cancelButtonText: 'Cancel',
        background: "rgba(255, 255, 255, 0.4)",
        backdrop: " rgba(58, 58, 58, 0.349)",
        buttonsStyling: false, 
        customClass: {
          confirmButton: "confirmBtn", 
          cancelButton:" cancelBtn",   
          popup:" popup",      
        }
      }).then((result) => {
        if (result.isConfirmed) {
          dispatch(deleteContact(id))
          .unwrap()
          .then(()=>{
            toast.success("Contact deleted!")
          })
        } })
    }

  const handleAddToFavorite = (id) =>{
    if (favoriteIsActive){
      return Swal.fire({
        title: `Remove contact "${name}" from favorites?`,
        icon: 'question',
        showCancelButton: true,
        confirmButtonText: 'Remove',
        cancelButtonText: 'Cancel',
        background: "rgba(255, 255, 255, 0.4)",
        backdrop: " rgba(58, 58, 58, 0.349)",
        buttonsStyling: false, 
        customClass: {
          confirmButton: "confirmBtn", 
          cancelButton:" cancelBtn",   
          popup:" popup",      
        }
      }).then((result) => {
        if (result.isConfirmed) {
          addFavorite(id)
          toast.success(`"${name}" removed from favorites!`)
        } })
    }
   return addFavorite(id)
  }

  const isActive = favContacts.includes(id)

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
      <button onClick={()=> handleAddToFavorite(id)} className={s.btn}>{isActive ? <FaStar size="25" /> : <FaRegStar size="25"/>}</button>
      </div>
    </div>
  )
}

export default Contact
