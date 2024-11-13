import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./components/App/App"
import "./index.css"
import "modern-normalize"
import { Provider } from "react-redux"
import { persistor, store } from "./redux/store"
import { BrowserRouter } from "react-router-dom"
import { PersistGate } from "redux-persist/integration/react"
import { Toaster } from "react-hot-toast"

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <App />
          <Toaster
            toastOptions={{
              style: {
                backgroundColor: "rgba(255, 255, 255, 0.400)",
                color: "rgb(255, 255, 255)",
              },
              position: "bottom-center",
            }}
          />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </StrictMode>
)
