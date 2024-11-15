import { Field, Form, Formik,ErrorMessage } from "formik"
import s from "./RegistrationForm.module.css"
import { useDispatch } from "react-redux"
import { register } from "../../redux/auth/operations"
import toast from "react-hot-toast"
import { RegisterSchema } from "../../services/validationYup"
import { useState } from "react"
import { IoMdEye, IoMdEyeOff } from "react-icons/io"




const RegistrationForm = () => {

  const [showPassword, setShowPassword] = useState(false)
  const togglePasswordVisible = ()=> {
    setShowPassword(prev=> !prev)
  }

  const dispatch = useDispatch()
  const initialValues = {
    name: "",
    email:"",
    password: ""
  }

  const handleSubmit = (values,options)=>{
    dispatch(register(values))
    .unwrap()
    .then((res)=>{
      toast(`Welcome, ${res.user.name}!`, {
        icon: '🤙',
       })
    })
    .catch(()=>{
      toast.error("Registration unsuccessful")
    })
    options.resetForm()

  }

  return (<div className={s.loginBox}>
    <p className={s.loginText}>Register to start </p>
<div className={s.formikBox} >
  <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RegisterSchema}>
  {({ values }) =>
  (
    <Form className={s.regFormBox}>

      <label className={s.label} >
        <span className={s.labelText}>Name</span>
        <Field className={s.input} type="text" name="name" placeholder="Enter your name"/> 
        <ErrorMessage className={s.error} name="name" component="span" />
      </label>

      <label className={s.label}>
        <span className={s.labelText}>Email</span>
        <Field className={s.input} type="email" name="email"  placeholder="Enter your email"/>
        <ErrorMessage className={s.error} name="email" component="span" />
      </label>

      <label className={s.label}>
      <span className={s.labelText}>Password</span>
      <div className={s.passwordContainer}>
        <Field className={s.input} type={showPassword ? 'text' : "password"} name="password" placeholder="Enter at least 8 characters"/>
        {values.password && <div className={s.toggleButton} onClick={togglePasswordVisible}>
       {showPassword ?<IoMdEye size="20"/>: <IoMdEyeOff size="20"/>}
       </div>}
        
       </div>
        <ErrorMessage className={s.error} name="password" component="span"/>
      </label>

      <button className={s.btn} type="submit">Register</button>
    </Form>
  )}
  </Formik>
   </div>
   <div className={s.infoBox}>
   <h2 className={s.infoTitle}>Create Your Account and Start Managing Your Contacts</h2>
   </div>
   </div>
  )
}
export default RegistrationForm