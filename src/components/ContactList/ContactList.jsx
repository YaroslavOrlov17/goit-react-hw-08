import { useSelector } from "react-redux"
import {
  selectShowFavorites,
} from "../../redux/contacts/selectors"
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


  const contacts = useSelector((state) => state.filters.searchResults).toSorted((a, b) =>
    b.name.localeCompare(a.name, "en", { sensitivity: "base" })
  )

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
          <li className={s.contactItem} key={contact.id}>
            <Contact contactData={contact} addFavorite={toggleFavorite} favContacts={favoritesContacts} />
          </li>
        ))}
      </ul>
    </div>
  )
}

export default ContactList
