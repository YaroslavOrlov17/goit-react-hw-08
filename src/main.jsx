import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App/App"
import "./index.css"
import "modern-normalize"
import { Provider } from "react-redux"
import { store } from "./redux/store"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
