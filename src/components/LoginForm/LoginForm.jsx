import { Field, Form, Formik } from "formik"
import s from "./LoginForm.module.css"
import { useDispatch, useSelector } from "react-redux"
import { login } from "../../redux/auth/operations"
import { selectIsLoggedIn } from "../../redux/auth/selectors"
import { Navigate } from "react-router-dom"


const LoginForm = () => {

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const dispatch = useDispatch()
  
  const initialValues = {
    email: "",
    password: ""
  }
  
  const handleSubmit = (values,options)=>{
    dispatch(login(values))
    options.resetForm()
  }

  if(isLoggedIn){
    return <Navigate to="/contacts"/> // ???????
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