import { Route, Routes } from "react-router-dom"
import Layout from "../Layout"
import HomePage from "../../pages/HomePage"
import ContactsPage from "../../pages/ContactsPage/ContactsPage"



function App() {
 
  return (
    <Routes>
      <Route path="/" element={<Layout/>}>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/contacts" element={<ContactsPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
