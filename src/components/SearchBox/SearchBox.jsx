import s from "./SearchBox.module.css"
import { MdOutlineSearch } from "react-icons/md"
import { useFuseSearch } from "../../services/useFuseSearch"

const SearchBox = () => {

  const handleSearch = useFuseSearch();
  const handleChange = (e) => {
    handleSearch(e.target.value)
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
