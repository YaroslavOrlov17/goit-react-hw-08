import { Field, Form, Formik } from "formik"
import s from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { login } from "../../redux/auth/operations"


const LoginForm = () => {
  const dispatch = useDispatch()

  const initialValues = {
    email: "",
    password: ""
  }
  
  const handleSubmit = (values,options)=>{
    dispatch(login(values))
    options.resetForm()
  }
  
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