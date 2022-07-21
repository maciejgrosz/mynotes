import React, {useState, useEffect} from 'react'
import {useParams } from 'react-router-dom';
import {ReactComponent as ArrowLeft} from '../assets/arrow-left.svg'
import {useNavigate} from 'react-router-dom'

const NotePage = () => {
    const { noteId } = useParams();
    let [note, setNote] = useState(null)
    const navigate = useNavigate();

    useEffect(() => {   
        getNote()
    }, [noteId])

    let getNote = async() => {
        if (noteId == 'new') return
        let response = await fetch(`/api/notes/${noteId}/`)
        let data = await response.json()
        setNote(data)     
    }

    let createNote = async() => {
        fetch(`/api/notes/`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    let updateNote = async() => {
        fetch(`/api/notes/${noteId}/`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(note)
        })
    }

    let deleteNote = async() => {
        fetch(`/api/notes/${noteId}/`, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            }
        })
        navigate("/")
    }

    let handleSubmit = ()=> {
        if(noteId !== 'new' && note.body == ''){
            deleteNote()
        }else if(noteId !== 'new'){
            updateNote()
        }else if(noteId === 'new' && note.body !== null){
            createNote()
        }
        navigate("/")
    }

    return (
        <div className="note">
            <div className="note-header">
                <h3>
                    <ArrowLeft onClick={handleSubmit}/> 
                </h3>
                {noteId !== 'new' ? (
                    <div> 
                        <button onClick={handleSubmit}>Edit</button>
                        <div class="space"></div>
                        <button onClick={deleteNote}>Delete</button>
                    </div>
                ): (
                    <button onClick={handleSubmit}>Done</button>
                )}

            </div>
            <textarea onChange={(e)=>{setNote({...note, 'body':e.target.value})}} value={note?.body}></textarea>
        </div>
  )
}

export default NotePage