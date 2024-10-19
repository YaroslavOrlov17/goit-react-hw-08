import { Formik, Form, Field, ErrorMessage } from "formik"
import { nanoid } from "nanoid"
import * as Yup from "yup"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { editContact} from "../../redux/contacts/operations"
import ReactDOM from 'react-dom'

import s from "./EditContactModal.module.css"
import { closeModal } from "../../redux/contacts/slice"
import { useEffect } from "react"


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

//-----------------------------
const EditContactModal = ({contact}) => {
  const initialValues = {
    name: contact.name,
    number: contact.number,
  }
  

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
    document.body.style.overflow = "hidden"; // Блокируем прокрутку

    return () => {
      document.body.style.overflow = ""; // Восстанавливаем прокрутку при размонтировании
    };
  }, []);

  return ReactDOM.createPortal(
    <div className={s.modalWrapper}>
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