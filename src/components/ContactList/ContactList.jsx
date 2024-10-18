import { useSelector } from "react-redux"
import {selectFilteredContacts} from "../../redux/contacts/selectors"
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"


const ContactList = () => {
const contacts = useSelector(selectFilteredContacts)

  return (
    <ul className={s.contactList}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact contactData={contact} />
        </li>
      ))}
    </ul>
  )
}

export default ContactList
