import React from "react";
import './styles/note.css'
import UserContext from "../UserContext";

class Note extends React.Component {

  static contextType = UserContext;


  render() {


    const note = this.context.notes.find(note => `/note/${note.id}` === this.props.match.url);


    const date = new Date(note.modified);
    const convertedDate = date.toDateString();

    const folder = this.context.folders.find(folder => {
      if (folder.id === note.folderId) {
        return true
      } else return false
    })


    return <div key={note.id}>
      <div className="button-folder-container">
        <button className="go-back" onClick={() => this.props.history.goBack()}>Go Back</button>
        <h2 className="folder-name">{folder.name}</h2>
      </div>

      <div className="expanded-note">
        <h2 className="note-name">{note.name}</h2>
        <p>Date Modified On: {convertedDate}</p>
        <button type="click">Delete Note</button>
      </div>

      <p className="note-content">{note.content}</p>

    </div>
  }
}

export default Note;
