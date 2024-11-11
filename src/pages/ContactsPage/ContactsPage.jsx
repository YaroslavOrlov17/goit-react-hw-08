import ContactForm from "../../components/ContactForm/ContactForm"
import SearchBox from "../../components/SearchBox/SearchBox"
import ContactList from "../../components/ContactList/ContactList"
import s from "./Contacts.page.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {fetchContacts} from "../../redux/contacts/operations"
import {selectIsLoading,selectError} from "../../redux/contacts/selectors"
import Loader from "../../components/Loader/Loader"
import toast from "react-hot-toast"
import Favorite from "../../components/Favorite/Favorite"


function ContactsPage() {
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectError)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    if (isError) {
      toast.error("Something went wrong. Please, try again!");
    }
    dispatch(fetchContacts())
  },[dispatch,isError])
  
 
  return (
    <div className={s.contactsPage}>
      <div className={s.fakeDiv}></div>
      <div className={s.contactForm}>
      <div className={s.titleBox}>
        <div className={s.position}>
        <h1 className={s.pbTitle}>PhoneBook</h1>
        {isLoading && <Loader/>}
        </div>
      </div>
      <ContactForm  /> 
      <SearchBox />
      <Favorite/>
      </div>
      <ContactList />
    </div>
  )
}

export default ContactsPage