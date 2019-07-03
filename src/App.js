import React from 'react';
import './App.css';
import { Route } from 'react-router-dom';
import Main from './components/main';
import MainSideBar from './components/mainsidebar';
import Header from './components/header';
import Note from './components/note';
import UserContext from './UserContext';


class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      store: {folders: [], notes: []}
    }
  }
  


  handleDeleteNote = (id) => {
    const filteredNotes = this.state.store.notes.filter(note => id !== note.id);
    this.setState({
      store: {...this.state.store, notes: filteredNotes}
    })
  }


  componentDidMount(){
    fetch(`http://localhost:9090/folders`)
    .then(res => res.json())
    .then(res => this.setState({
      store: {...this.state.store, folders: res}
    }))
    .then(() => fetch(`http://localhost:9090/notes`))
    .then(res => res.json())
    .then(res => this.setState({
      store: {...this.state.store, notes: res}
    }))
  }


  render() {
    return (
      <div className="App">
        <Header />
        <Route exact path='/'
          render={() => <UserContext.Provider value={{
            folders: this.state.store.folders
          }}>
            <MainSideBar />
          </UserContext.Provider>}
        />
        <Route exact path='/'
          render={props => <UserContext.Provider value={{
            folders: this.state.store.folders,
            notes: this.state.store.notes
          }}>
            <Main match={props.match} handleDeleteNote={this.handleDeleteNote} />
          </UserContext.Provider>}
        />
        <Route exact path='/folder/:folderId'
          render={props => <UserContext.Provider value={{
            folders: this.state.store.folders,
            notes: this.state.store.notes
          }}><MainSideBar match={props.match} />
            <Main match={props.match} handleDeleteNote={this.handleDeleteNote} />
          </UserContext.Provider>}
        />

        <Route exact path='/note/:noteId'
          render={props => <UserContext.Provider value={{
            folders: this.state.store.folders,
            notes: this.state.store.notes
          }}><Note match={props.match} history={props.history} /></UserContext.Provider>}
        />
      </div>
    );
  }
}

export default App;
