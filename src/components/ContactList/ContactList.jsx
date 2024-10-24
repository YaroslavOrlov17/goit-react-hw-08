import { useSelector } from "react-redux"
import {
  selectEditedContact,
  selectFilteredContacts,
  selectOpenModal,
} from "../../redux/contacts/selectors"
import EditContactModal from "../EditContactModal/EditContactModal"
import Contact from "../Contact/Contact"
import s from "./ContactList.module.css"

const ContactList = () => {
  const contacts = useSelector(selectFilteredContacts).toSorted((a, b) =>
    b.name.localeCompare(a.name, "en", { sensitivity: "base" })
  )
  const selectedContact = useSelector(selectEditedContact)
  const isModalOpen = useSelector(selectOpenModal)

  return (
    <div className={s.contactListBox}>
      <ul className={s.contactList}>
        {contacts.map((contact) => (
          <li key={contact.id}>
            <Contact contactData={contact} />
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
