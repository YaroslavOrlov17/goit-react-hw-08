import { Field, Form, Formik,ErrorMessage } from "formik"
import * as Yup from "yup"
import s from "./RegistrationForm.module.css"
import { useDispatch } from "react-redux"
import { register } from "../../redux/auth/operations"
import toast from "react-hot-toast"




const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;


const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .required("Required field").
    matches(usernamePattern,"Please enter correct Username"),
  email: Yup.string()
    .min(3, "Too Short!")
    .max(50, "Too Long!")
    .email()
    .required("Required field").
    matches(emailPattern,"Email is not correct"),
  password: Yup.string()
    .min(8, "Too Short!")
    .max(50, "Too Long!")
    .required("Required field"),
})

const RegistrationForm = () => {

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
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.300)',
          color: 'rgb(255, 255, 255)',
        }})
    })
    .catch(()=>{
      toast.error("Registration unsuccessful",{
        style: {
          backgroundColor: 'rgba(255, 255, 255, 0.300)',
          color: 'rgb(255, 255, 255)',
        }
      })
    })
    options.resetForm()

  }

  return (<div className={s.loginBox}>
<div className={s.formikBox} >
  <Formik initialValues={initialValues} onSubmit={handleSubmit} validationSchema={RegisterSchema}>
    <Form className={s.regFormBox}>
      <label className={s.label} >
        <span className={s.labelText}>Name</span>
        <Field type="text" name="name"/> 
        <ErrorMessage className={s.error} name="name" component="span" />
      </label>
      <label className={s.label}>
        <span className={s.labelText}>Email</span>
        <Field type="email" name="email"/>
        <ErrorMessage className={s.error} name="email" component="span" />
      </label>
      <label className={s.label}>
      <span className={s.labelText}>Password</span>
        <Field type="password" name="password"/>
        <ErrorMessage className={s.error} name="password" component="span"/>
      </label>
      <button className={s.btn} type="submit">Register</button>
    </Form>
  </Formik>
   </div>
   <div className={s.infoBox}>
   <h2 className={s.infoTitle}>Create Your Account and Start Managing Your Contacts</h2>
   </div>
   </div>
  )
}
export default RegistrationForm