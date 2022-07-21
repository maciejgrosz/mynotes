import React from 'react'
import {ReactComponent as SearchIcon} from '../assets/search.svg'
function SearchBar({placeholder, notes}) {
  

  return (
    <div className="search">
        <div className="searchInputs">
            <input type="text" placeholder={placeholder}/>
            <div className="searchIcon"><SearchIcon/></div>
        </div>
        <div className="dataResults">
            {
                // notes.length TODO 
            }
        </div>

    </div>
  )
}

export default SearchBar