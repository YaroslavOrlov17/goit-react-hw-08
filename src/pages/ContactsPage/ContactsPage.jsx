import ContactForm from "../../components/ContactForm/ContactForm"
import SearchBox from "../../components/SearchBox/SearchBox"
import ContactList from "../../components/ContactList/ContactList"
import s from "./Contacts.page.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {fetchContacts} from "../../redux/contacts/operations"
import {selectIsLoading,selectError} from "../../redux/contacts/selectors"
import Loader from "../../components/Loader/Loader"


function ContactsPage() {
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectError)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchContacts())
  },[dispatch])
  

  return (
    <div className={s.contactsPage}>
      <div className={s.contactForm}>
      <div className={s.titleBox}>
        <div className={s.position}>
        <h1 className={s.pbTitle}>PhoneBook</h1>
        {isLoading && <Loader/>}
        </div>
      </div>
      <ContactForm  /> 
      <SearchBox />
      </div>
      <ContactList />
      {isError && <h2>Something went wrong. Please, try again!</h2>}
    </div>
  )
}

export default ContactsPage