import { Formik, Form, Field, ErrorMessage } from "formik"
import { nanoid } from "nanoid"
import * as Yup from "yup"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { useDispatch } from "react-redux"
import {addContact} from "../../redux/contacts/operations"

import s from "./ContactForm.module.css"
import toast from "react-hot-toast"

const initialValues = {
  name: "",
  number: "",
}

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

const ContactForm = () => {

const dispatch = useDispatch()
const nameId = nanoid()
const numId = nanoid()
function handleSubmit(values, actions) {
    const addNewContact = { ...values,}
    dispatch(addContact(addNewContact))
    .unwrap()
    .then(()=>{
      toast.success(`Contact added`)
    })
    actions.resetForm()
  }

  return (
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
          Create
        </button>
      </Form>
    </Formik>
  )
}

export default ContactForm
