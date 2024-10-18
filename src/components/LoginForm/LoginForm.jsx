import { Field, Form, Formik } from "formik"
import s from "./LoginForm.module.css"

const initialValues = {
  email: "",
  password: ""
}

const handleSubmit = (values,options)=>{
  console.log(values);
  options.resetForm()
}

const LoginForm = () => {
  return (
   <div className={s.formikBox} >
     <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={s.loginFormBox}>
      <label >
        <span className={s.label}>Email</span>
        <Field type="email" name="email"/>  
      </label>
      <label >
      <span className={s.label}>Password</span>
        <Field type="password" name="password"/>
      </label>
      <button type="submit">Login</button>
    </Form>
  </Formik>
   </div>
  )
}
export default LoginForm