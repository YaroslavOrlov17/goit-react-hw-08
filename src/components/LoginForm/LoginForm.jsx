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

  return (<div className={s.loginBox}>
   <div className={s.formikBox} >
     <Formik initialValues={initialValues} onSubmit={handleSubmit}>
    <Form className={s.loginFormBox}>
      <label className={s.label} >
        <span className={s.labelText}>Email</span>
        <Field type="email" name="email"/>  
      </label>
      <label >
      <span className={s.labelText}>Password</span>
        <Field type="password" name="password"/>
      </label>
      <button className={s.btn} type="submit">Login</button>
    </Form>
  </Formik>
   </div>
   <div className={s.infoBox}></div>
   </div>
  )
}
export default LoginForm