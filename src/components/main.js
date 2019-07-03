import React from 'react';
import NoteList from './notelist';
import './styles/main.css'
import UserContext from '../UserContext';

class Main extends React.Component {

  static contextType = UserContext;

  render() {
    console.log('In Main:',this.props)
    return (
      <div>
        <NoteList 
          folders={this.context.folders} 
          match={this.props.match} 
          handleDeleteNote={this.props.handleDeleteNote}
          notes={this.context.notes} />
        <button className="add-note">Add Note</button>
      </div>
    )
  }
}

export default Main