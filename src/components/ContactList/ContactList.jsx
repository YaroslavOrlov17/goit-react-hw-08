import { useSelector } from "react-redux"
import {
  selectEditedContact,
  selectFilteredContacts,
  selectOpenModal,
  selectShowFavorites,
} from "../../redux/contacts/selectors"
import EditContactModal from "../EditContactModal/EditContactModal"
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"
import { useEffect, useState } from "react"

const ContactList = () => {

  const [favoritesContacts, setFavoritesContacts] = useState(()=> {
    const savedFavContacts = window.localStorage.getItem("fav-ids")
  if (savedFavContacts !== null) {
    return JSON.parse(savedFavContacts)
  }
  return []})


  const contacts = useSelector(selectFilteredContacts).toSorted((a, b) =>
    b.name.localeCompare(a.name, "en", { sensitivity: "base" })
  )
  const selectedContact = useSelector(selectEditedContact)
  const isModalOpen = useSelector(selectOpenModal)

  const showFavorite = useSelector(selectShowFavorites)

  useEffect(() => {
    window.localStorage.setItem("fav-ids", JSON.stringify(favoritesContacts))
  }, [favoritesContacts])

  const toggleFavorite = (contactId) => {
    setFavoritesContacts(prev=> {
    return  prev.includes(contactId) ? prev.filter(id=> id !== contactId) : [...prev, contactId]
    })
  }

  const displayedFavContacts = showFavorite ? contacts.filter(contact => favoritesContacts.includes(contact.id)) : contacts

  return (
    <div className={s.contactListBox}>
      <ul className={s.contactList}>
        {displayedFavContacts.map((contact) => (
          <li key={contact.id}>
            <Contact contactData={contact} addFavorite={toggleFavorite} favContacts={favoritesContacts} />
          </li>
        ))}
      </ul>
      {isModalOpen && selectedContact && (
        <EditContactModal contact={selectedContact} />
      )}
    </div>
  )
}

export default ContactList
