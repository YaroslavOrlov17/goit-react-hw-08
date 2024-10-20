import { Field, Form, Formik } from "formik"
import s from "./RegistrationForm.module.css"
import { useDispatch } from "react-redux"
import { register } from "../../redux/auth/operations"



const RegistrationForm = () => {

  const dispatch = useDispatch()
  const initialValues = {
    name: "",
    email:"",
    password: ""
  }

  const handleSubmit = (values,options)=>{
    dispatch(register(values))
    options.resetForm()

  }

  return (<div className={s.loginBox}>
<div className={s.formikBox} >
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={s.regFormBox}>
      <label className={s.label} >
        <span className={s.labelText}>Name</span>
        <Field type="text" name="name"/>  
      </label>
      <label className={s.label}>
        <span className={s.labelText}>Email</span>
        <Field type="email" name="email"/>  
      </label>
      <label className={s.label}>
      <span className={s.labelText}>Password</span>
        <Field type="password" name="password"/>
      </label>
      <button className={s.btn} type="submit">Register</button>
    </Form>
  </Formik>
   </div>
   <div className={s.infoBox}></div>
   </div>
  )
}
export default RegistrationForm