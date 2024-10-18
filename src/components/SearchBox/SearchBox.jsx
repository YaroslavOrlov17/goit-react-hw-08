import { useDispatch, useSelector } from "react-redux"
import s from "./SearchBox.module.css"
import { MdOutlineSearch } from "react-icons/md"
import { changeFilter,selectNameFilter } from "../../redux/filters/slice.js";

const SearchBox = () => {
  
const dispatch = useDispatch()
const value = useSelector(selectNameFilter)
const handleChange = (e)=>{
  dispatch(changeFilter(e.target.value))
}

  return (
    <div className={s.searchInputBox}>
      <div className={s.searchBox}>
        <input
          className={s.searchInput}
          type="text"
          value={value}
          onChange={handleChange}
          placeholder="Search contact..."
        />
        <MdOutlineSearch className={s.searchIcon} size="25" />
      </div>
    </div>
  )
}

export default SearchBox
