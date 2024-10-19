import { useSelector } from "react-redux"
import {selectEditedContact, selectFilteredContacts} from "../../redux/contacts/selectors"
import EditContactModal from "../EditContactModal/EditContactModal"
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"


const ContactList = () => {
const contacts = useSelector(selectFilteredContacts)
const selectedContact = useSelector(selectEditedContact)
  return (
    <div>
      <ul className={s.contactList}>
      {contacts.map((contact) => (
        <li key={contact.id}>
          <Contact contactData={contact} />
        </li>
      ))}
    </ul>
        {<EditContactModal contact={selectedContact} />}
    </div>
  )
}

export default ContactList
