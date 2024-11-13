import { Formik, Form, Field, ErrorMessage } from "formik"
import { nanoid } from "nanoid"
import { FaPhoneSquare } from "react-icons/fa"
import { IoPersonCircle } from "react-icons/io5"
import { useDispatch } from "react-redux"
import { addContact } from "../../redux/contacts/operations"
import { IMaskInput } from 'react-imask';
import s from "./ContactForm.module.css"
import toast from "react-hot-toast"
import { useState } from "react"
import { ContactSchema } from "../../services/validationYup"

const initialValues = {
  name: "",
  number: "",
}

const ContactForm = () => {
  const [number, setNumber] = useState('');
  const dispatch = useDispatch()

  const nameId = nanoid()
  const numId = nanoid()

  function handleSubmit(values, actions) {
    const addNewContact = { ...values }
    dispatch(addContact(addNewContact))
      .unwrap()
      .then(() => {
        toast.success(`Contact added`)
      })
    actions.resetForm()
    setNumber(''); 
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validationSchema={ContactSchema}
    >
      {({ setFieldValue }) =>
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
          <IMaskInput
              mask="(000) 000-00-00"
              id="number"
              name="number"
              unmask={true}
              value={number}
              className={s.formInput}
              onAccept={(value) => {
                setNumber(value);  
                setFieldValue("number", value)
              }}
            />
          <ErrorMessage className={s.error} name="number" component="span" />
        </div>

        <button className={s.formBtn} type="submit">
          Create
        </button>
      </Form>
       }
    </Formik>
  )
}

export default ContactForm
