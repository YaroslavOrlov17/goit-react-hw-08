import { Formik, Form, Field, ErrorMessage } from "formik"
import { nanoid } from "nanoid"
import * as Yup from "yup"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { useDispatch, useSelector } from "react-redux"
import { editContact } from "../../redux/contacts/operations"
import ReactDOM from "react-dom"

import s from "./EditContactModal.module.css"
import { closeModal } from "../../redux/contacts/slice"
import { useEffect } from "react"
import { selectOpenModal } from "../../redux/contacts/selectors"
import toast from "react-hot-toast"

const phoneRegExp = /^\d+$/

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

const EditContactModal = ({ contact }) => {
  const initialValues = {
    name: contact.name,
    number: contact.number,
  }

  const modalIsOpen = useSelector(selectOpenModal)

  const dispatch = useDispatch()

  const nameId = nanoid()
  const numId = nanoid()

  function handleSubmit({ name, number }, actions) {
    dispatch(
      editContact({
        id: contact.id,
        updatedContact: {
          name,
          number,
        },
      })
    )
      .unwrap()
      .then(() => {
        toast.success("Contact edited!")
      })
    dispatch(closeModal())
    actions.resetForm()
  }

  useEffect(() => {
    if (modalIsOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = ""
    }
    return () => {
      document.body.style.overflow = ""
    }
  }, [modalIsOpen])

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
          <div className={s.btnBox}>
            <button className={s.formBtnSave} type="submit">
              Save
            </button>
            <button
              className={s.formBtnCancel}
              onClick={() => dispatch(closeModal())}
              type="button"
            >
              Cancel
            </button>
          </div>
        </Form>
      </Formik>
    </div>,
    modalRoot
  )
}

export default EditContactModal
