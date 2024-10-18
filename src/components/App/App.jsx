import ContactForm from "../ContactForm/ContactForm"
import SearchBox from "../SearchBox/SearchBox"
import ContactList from "../ContactList/ContactList"
import s from "./App.module.css"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import {fetchContacts} from "../../redux/contacts/operations"
import {selectIsLoading,selectError} from "../../redux/contacts/slice"
import Loader from "../Loader/Loader"


function App() {
  const isLoading = useSelector(selectIsLoading)
  const isError = useSelector(selectError)
  
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchContacts())
  },[dispatch])
  

  return (
    <div className="container">
      <div className={s.titleBox}>
        <div className={s.position}>
        <h1 className={s.pbTitle}>PhoneBook</h1>
        {isLoading && <Loader/>}
        </div>
      </div>
      <ContactForm  /> 
      <SearchBox />
      <ContactList />
      {isError && <h2>Something went wrong. Please, try again!</h2>}
    </div>
  )
}

export default App
