import s from "./Contact.module.css"
import {deleteContact, editContact} from "../../redux/contacts/operations"
import { useDispatch, useSelector } from "react-redux"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { FaRegStar } from "react-icons/fa6";
import { FaStar } from "react-icons/fa";
import toast from "react-hot-toast"
import Swal from "sweetalert2"
import { selectShowFavorites } from "../../redux/contacts/selectors"
import * as Yup from "yup"
import { ErrorMessage, Field, Form, Formik } from "formik"
import { nanoid } from "nanoid"
import ReactDOM from 'react-dom/client';

const Contact = ({ favContacts,contactData,contactData: { name, number, id },addFavorite}) => {

  const favoriteIsActive = useSelector(selectShowFavorites)
  const dispatch = useDispatch()

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

const handleEditContact = (contactData) => {

const phoneRegExp = /^\d+$/

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required field"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .matches(phoneRegExp, "Incorrect phone number")
    .required("Required field"),
})

const nameId = nanoid()
const numId = nanoid() 

const initialValues = {
      name: contactData.name,
      number: contactData.number,
    }
  
Swal.fire({
      title: 'Edit Contact',
      html: '<div id="form-container"></div>', 
      didOpen: () => {
        const formContainer = document.getElementById('form-container');
        if (formContainer) {
          const root = ReactDOM.createRoot(formContainer);
          root.render(
            <Formik
              initialValues={initialValues}
              validationSchema={ContactSchema}
              onSubmit={(values) => {
                Swal.close();
                dispatch(
                  editContact({
                    id: contactData.id,
                    updatedContact: {
                      name:values.name,
                      number: values.number
                    },
                  })
                )
                toast.success(`Contact edited!`)
              }}
            >
              {({ submitForm }) => (
                <Form className={s.form}>
                  <label htmlFor={nameId}>Name</label>
          <div className={s.formName}>
            <IoPersonCircle className={s.contactIconF} size="25" />
            <Field className={s.formInput} id={nameId} name="name" />
            <ErrorMessage className={s.error} name="name" component="span" />
          </div>

          <label htmlFor={numId}>Number</label>
          <div className={s.formNumber}>
            <FaPhoneSquare className={s.phoneIconF} size="22" />
            <Field className={s.formInput} id={numId} name="number" />
            <ErrorMessage className={s.error} name="number" component="span" />
          </div>
          <div className={s.btnBoxF}>
                  <button className={s.formBtnSave} type="button" onClick={submitForm}>
                    Edit
                  </button>
                  <button
              className={s.formBtnCancel}
              onClick={() => Swal.close()}
              type="button"
            >
              Cancel
            </button> 
            </div>
                </Form>
              )}
            </Formik>
          );
        }
      },
      showConfirmButton: false,
      showCancelButton: false,
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel',
      background: "rgba(255, 255, 255, 0.4)",
      backdrop: " rgba(58, 58, 58, 0.349)",
      buttonsStyling: false, 
      customClass: {
        cancelButton:"confirmBtn",   
        popup:" popup",      
      }
    })
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
      <button onClick={()=> handleEditContact(contactData)} className={s.btn}><MdEdit size="25" /></button>
      <button onClick={()=> handleAddToFavorite(id)} className={s.btn}>{isActive ? <FaStar size="25" /> : <FaRegStar size="25"/>}</button>
      </div>
    </div>
  )
}

export default Contact
