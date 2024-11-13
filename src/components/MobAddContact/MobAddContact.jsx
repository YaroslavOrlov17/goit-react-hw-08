import { FaPhoneSquare } from "react-icons/fa";
import { nanoid } from "nanoid";
import Swal from "sweetalert2";
import { ErrorMessage, Field, Form, Formik } from "formik";
import toast from "react-hot-toast";
import { IoPersonCircle } from "react-icons/io5";
import ReactDOM from 'react-dom/client';
import { addContact } from "../../redux/contacts/operations";
import { IMaskInput } from "react-imask";
import { useDispatch } from "react-redux";
import s from './MobAddContact.module.css'
import { ContactSchema } from "../../services/validationYup";


const MobAddContact = () => {

    const dispatch = useDispatch()

    const handleAddContact = () => {

        const nameId = nanoid()
        const numId = nanoid() 

        const initialValues = {
              name: "",
              number: ""
            }
            
        Swal.fire({
              title: 'Add new contact',
              html: '<div id="form-container"></div>', 
              didOpen: () => {
                const formContainer = document.getElementById('form-container');
                if (formContainer) {
                  const root = ReactDOM.createRoot(formContainer);
                  root.render(
                    <Formik
                      initialValues={initialValues}
                      validationSchema={ContactSchema}
                      onSubmit={(values,actions) => {
                        Swal.close();
                        const addNewContact = { ...values }
                        dispatch(addContact(addNewContact))
                          .unwrap()
                          .then(() => {
                            toast.success(`Contact added`)
                          })
                        actions.resetForm()
                      }}
                    >
                      {({ submitForm,setFieldValue }) => (
                        <Form className={s.form}>
                          <label htmlFor={nameId}>Name</label>
                  <div className={s.formName}>
                    <IoPersonCircle className={s.contactIconF} size="25" />
                    <Field className={s.formInput} id={nameId} name="name" />
                    <ErrorMessage className={s.error} name="name" component="span" />
                  </div>
        
                  <label htmlFor={numId}>Number</label>
                  <div className={s.formNumber}>
                    <FaPhoneSquare className={s.phoneIconF} size="22" />
                    <IMaskInput
                      mask="(000) 000-00-00"
                      unmask={true}
                      id={numId}
                      name="number"
                       className={s.formInput}
                       defaultValue={initialValues.number}
                      onAccept={(value) => setFieldValue("number", value)}
          />
                    <ErrorMessage className={s.error} name="number" component="span" />
                  </div>
                  <div className={s.btnBoxF}>
                          <button className={s.formBtnSave} type="button" onClick={submitForm}>
                            Add
                          </button>
                          <button
                      className={s.formBtnCancel}
                      onClick={() => Swal.close()}
                      type="button"
                    >
                      Cancel
                    </button> 
                    </div>
                        </Form>
                      )}
                    </Formik>
                  );
                }
              },
              showConfirmButton: false,
              showCancelButton: false,
              confirmButtonText: 'Delete',
              cancelButtonText: 'Cancel',
              background: "rgba(255, 255, 255, 0.4)",
              backdrop: " rgba(58, 58, 58, 0.349)",
              buttonsStyling: false, 
              customClass: {
                cancelButton:"confirmBtn",   
                popup:" popup",      
              }
            })
          }

  return (
    <button className={s.addContactBtn} onClick={()=> handleAddContact()}>
          Add new
          </button>
  )
}
export default MobAddContact