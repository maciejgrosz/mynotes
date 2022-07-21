import React, {useState, useEffect} from 'react'
import ListItem from '../components/ListItem'
import AddButton from '../components/AddButton'

const NotesListPage = () => {
    
    let [notes, setNotes] = useState([])
    const [filteredData, setFilteredData] = useState([])

    useEffect(() => {
        getNotes() 
    }, [])

    let getNotes = async () => {
        let response = await fetch('/api/notes')
        let data = await response.json()
        setNotes(data)
    }

    let getTitle = (note) => {
        let title = note.body.split("\n")[0]
        if(title.length > 45){
          return title.slice(0, 45)
        }
        return title
      }

    const handleFilter = (event) =>{
        const searchWord = event.target.value
        const newFilter = notes.filter((value) =>{
            return getTitle(value).toLowerCase().includes(searchWord.toLowerCase())
        })
        setFilteredData(newFilter)
  }
 
    return (
        <div className="notes"> 
            <div className="notes-header">
                <h2 className="notes-title">&#9782; Notes</h2>
                <h1 className='searchInputs'>  
                    <input type="text" placeholder="Search for title..." onChange={handleFilter}></input>
                </h1>
                <p className="notes-count">{notes.length}</p>
            </div>
            <div>
                {filteredData.length != 0 && (
                <div className="notes-list">
                    {filteredData.map((note, index)=>(
                        <ListItem key={index} note={note}/>
                    ))}
                </div>
                )}
                {filteredData.length == 0 && (
                <div className="notes-list">
                    {notes.map((note, index)=>(
                        <ListItem key={index} note={note}/>
                    ))}
                </div>
                )}
            </div>
            <div><AddButton/></div>
        </div>
    )
}

export default NotesListPage