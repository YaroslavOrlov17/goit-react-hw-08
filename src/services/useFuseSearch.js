import { useDispatch, useSelector } from "react-redux"
import { selectContacts } from "../redux/contacts/selectors"
import { selectFilter } from "../redux/filters/selectors"
import { useEffect } from "react"
import Fuse from "fuse.js"
import { changeFilter, setSearchResults } from "../redux/filters/slice"

export const useFuseSearch = ()=>{
    const dispatch = useDispatch()
    const contacts = useSelector(selectContacts)
    const filterQuery = useSelector(selectFilter)

    useEffect(() => {
        const fuse = new Fuse(contacts, {
           keys: ["name", "number"], 
           threshold: 0.1
        });
  
        if (filterQuery) {
           const results = fuse.search(filterQuery).map(result => result.item);
           dispatch(setSearchResults(results));
        } else {
           dispatch(setSearchResults(contacts));
        }
     }, [contacts, filterQuery, dispatch]);
  
     const handleSearch = (value) => {
        dispatch(changeFilter(value));
     };
     return handleSearch;
}