import { useDispatch } from "react-redux"
import s from "./SearchBox.module.css"
import { MdOutlineSearch } from "react-icons/md"
import { changeFilter } from "../../redux/filters/slice"

const SearchBox = () => {
  const dispatch = useDispatch()
  const handleChange = (e) => {
    dispatch(changeFilter(e.target.value))
  }

  return (
    <div className={s.searchInputBox}>
      <div className={s.searchBox}>
        <input
          className={s.searchInput}
          type="text"
          onChange={handleChange}
          placeholder="Search contact..."
        />
        <MdOutlineSearch className={s.searchIcon} size="25" />
      </div>
    </div>
  )
}

export default SearchBox
