import ClipLoader from "react-spinners/ClipLoader"
import s from "./Loader.module.css"


const Loader = () => {
  return <ClipLoader className={s.loader} color="#000000" size="27px" />
}

export default Loader