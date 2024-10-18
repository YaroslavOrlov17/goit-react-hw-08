import { Route, Routes } from "react-router-dom"
import Layout from "../Layout"
import HomePage from "../../pages/HomePage/HomePage"
import ContactsPage from "../../pages/ContactsPage/ContactsPage"
import LoginPage from "../../pages/LoginPage/LoginPage"
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage"



function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="contacts" element={<ContactsPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegistrationPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
