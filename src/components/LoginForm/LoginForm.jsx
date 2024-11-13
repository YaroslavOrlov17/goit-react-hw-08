import { Field, Form, Formik,ErrorMessage } from "formik"
import s from "./LoginForm.module.css"
import { useDispatch } from "react-redux"
import { login } from "../../redux/auth/operations"
import toast from "react-hot-toast"
import { LoginSchema } from "../../services/validationYup"






const LoginForm = () => {

  const dispatch = useDispatch()
  
  const initialValues = {
    email: "",
    password: ""
  }
  
  const handleSubmit = (values,options)=>{
    dispatch(login(values))
    .unwrap()
    .then((res)=>{
      toast(`Welcome, ${res.user.name}!`, {
        icon: '🤙',
        position:"bottom-center"
        })
    })
    .catch(()=>{
      toast.error("Invalid credentials!")
    })
    options.resetForm()
  }

  return (<div className={s.loginBox}>
    <p className={s.loginText}>Login to start</p>
   <div className={s.formikBox} >
     <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={LoginSchema}>
    <Form className={s.loginFormBox}>
      <label className={s.label} >
        <span className={s.labelText}>Email</span>
        <Field className={s.input} type="email" name="email" placeholder="Enter your email"/>  
        <ErrorMessage className={s.error} name="email" component="span" />
      </label>
      <label >
      <span className={s.labelText}>Password</span>
        <Field className={s.input} type="password" name="password"  placeholder="Enter your password"/>
        <ErrorMessage className={s.error} name="password" component="span" />
      </label>
      <button className={s.btn} type="submit">Login</button>
    </Form>
  </Formik>
   </div>
   <div className={s.infoBox}>
    <h2 className={s.infoTitle}>Log in to your phonebook and start managing your contacts now!</h2>
   </div>
   </div>
  )
}
export default LoginForm