import { Route, Routes } from "react-router-dom"
import Layout from "../Layout"
import HomePage from "../../pages/HomePage/HomePage"
import ContactsPage from "../../pages/ContactsPage/ContactsPage"
import LoginPage from "../../pages/LoginPage/LoginPage"
import RegistrationPage from "../../pages/RegistrationPage/RegistrationPage"
import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import { refreshUser } from "../../redux/auth/operations"
import { selectIsRefreshing } from "../../redux/auth/selectors"



function App() {
  const isRefreshing = useSelector(selectIsRefreshing);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(refreshUser())
  },[dispatch])
 
  return (isRefreshing ? (null): // !!! Поставить лоадер
    (<Routes>
      <Route path="/" element={<Layout/>}>
        <Route index element={<HomePage/>}/>
        <Route path="contacts" element={<ContactsPage/>}/>
        <Route path="login" element={<LoginPage/>}/>
        <Route path="register" element={<RegistrationPage/>}/>
      </Route>
    </Routes>)
  )
}

export default App
