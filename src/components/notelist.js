import React from 'react';
import {Link} from 'react-router-dom';
import './styles/notelist.css'


function NoteList(props) {
    console.log(props)
    const filteredNoteList = props.notes
        .filter(note => `/folder/${note.folderId}` === props.match.url)
        .map(note => {
            const date = new Date(note.modified)
        const convertedDate = date.toDateString()
            return (
                <li key={note.id}>
                    <Link to={`/note/${note.id}`}>
                    <h2>{note.name}</h2>
                    </Link>
                    <p>Date Modified On: {convertedDate}</p>
                    <button type="click" onClick={() => props.handleDeleteNote(note.id)} className="delete-button">Delete Note</button>
                </li>
            )
        })

    const noteList = props.notes.map(note => {
        const date = new Date(note.modified)
        const convertedDate = date.toDateString()
        return (
            <li key={note.id}>
                <Link to={`/note/${note.id}`}>
                <h2>{note.name}</h2>
                </Link>
                <p>Date Modified On: {convertedDate}</p>
                <button type="click" onClick={() => props.handleDeleteNote(note.id)} className="delete-button">Delete Note</button>
            </li>
        )
    })

    if (props.match.url === '/') {
        return (
            <div className="note-list">
                {noteList}
            </div>
        )
    } else return (
        <div className="note-list">
            {filteredNoteList}
        </div>
    )

}

export default NoteList;