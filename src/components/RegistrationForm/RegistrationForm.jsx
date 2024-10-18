import { Field, Form, Formik } from "formik"
import s from "./RegistrationForm.module.css"



const RegistrationForm = () => {
  const initialValues = {
    name: "",
    email:"",
    password: ""
  }

  const handleSubmit = (values,options)=>{
    console.log(values);
    options.resetForm()

  }

  return (
<div className={s.formikBox} >
  <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={s.regFormBox}>
      <label >
        <span className={s.label}>Name</span>
        <Field type="text" name="name"/>  
      </label>
      <label >
        <span className={s.label}>Email</span>
        <Field type="email" name="email"/>  
      </label>
      <label >
      <span className={s.label}>Password</span>
        <Field type="password" name="password"/>
      </label>
      <button className={s.btn} type="submit">Register</button>
    </Form>
  </Formik>
   </div>
  )
}
export default RegistrationForm