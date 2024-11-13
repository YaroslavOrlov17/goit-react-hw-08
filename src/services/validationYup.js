import * as Yup from "yup"


export const phoneRegExp = /^\d+$/
export const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
const usernamePattern = /^[a-zA-Z0-9_-]{3,20}$/;
        
export const ContactSchema = Yup.object().shape({
  name: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Required field"),
  number: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .matches(phoneRegExp, "Incorrect phone number")
    .required("Required field"),
})


export const LoginSchema = Yup.object().shape({
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





export const RegisterSchema = Yup.object().shape({
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