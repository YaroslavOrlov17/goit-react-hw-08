import { Formik, Form, Field, ErrorMessage } from "formik"
import { nanoid } from "nanoid"
import * as Yup from "yup"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { editContact} from "../../redux/contacts/operations"
import ReactDOM from 'react-dom'

import s from "./EditContactModal.module.css"
import { closeModal } from "../../redux/contacts/slice"
import { useEffect } from "react"
import clsx from "clsx"
import { selectOpenModal } from "../../redux/contacts/selectors"


const phoneRegExp = /^(\d[-\d]*){3,}$/

const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required field"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .matches(phoneRegExp, "Incorrect phone number")
    .required("Required field"),
})

const modalRoot = document.querySelector("#modal-root")

//----------------------------- Начало компонента
const EditContactModal = ({contact}) => {
  const initialValues = {
    name: contact?.name || '', 
    number: contact?.number || '',
  }

const modalIsOpen = useSelector(selectOpenModal)

const dispatch = useDispatch()
const nameId = nanoid()
const numId = nanoid()

function handleSubmit({name,number}, actions) {
    dispatch(editContact({id :contact.id,
      updatedContact: {
      name,
      number
    }}))
    dispatch(closeModal())
    actions.resetForm()
  }

  useEffect(() => {
    if (modalIsOpen) {
      const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth; // Получаем ширину полосы прокрутки
      document.body.style.overflow = 'hidden'; // Отключаем скролл
      document.body.style.paddingRight = `${scrollBarWidth}px`; // Добавляем padding
    } else {
      document.body.style.overflow = ''; // Восстанавливаем скролл
      document.body.style.paddingRight = ''; // Убираем padding
    }

    return () => {
      document.body.style.overflow = ''; // Восстанавливаем скролл
      document.body.style.paddingRight = ''; // Убираем padding
    };
  }, [modalIsOpen]); // что то страшное но работает спасибо гпт


  return ReactDOM.createPortal(
    <div className={ clsx(s.modalWrapper, modalIsOpen && s.modalShow )}>
        <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      <Form className={s.form}>
        <label htmlFor={nameId}>Name</label>
        <div className={s.formName}>
          <IoPersonCircle className={s.contactIcon} size="25" />
          <Field className={s.formInput} id={nameId} name="name" />
          <ErrorMessage className={s.error} name="name" component="span" />
        </div>

        <label htmlFor={numId}>Number</label>
        <div className={s.formNumber}>
          <FaPhoneSquare className={s.phoneIcon} size="22" />
          <Field className={s.formInput} id={numId} name="number" />
          <ErrorMessage className={s.error} name="number" component="span" />
        </div>

        <button className={s.formBtn} type="submit">
          Save
        </button>
        <button className={s.formBtn} onClick={()=>dispatch(closeModal())} type="button">
         Cancel
        </button>
      </Form>
    </Formik>
    </div>, modalRoot
  )
}

export default EditContactModal
