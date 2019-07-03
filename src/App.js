import React from 'react';
import './App.css';
import store from './dummy-store';
import {Route} from 'react-router-dom'
import Main from './components/main';
import MainSideBar from './components/mainsidebar'
import Header from './components/header'
import Note from './components/note'


class App extends React.Component {
  
  state = {
    store
  }

  render(){

  return (
    <div className="App">
      <Header/>
        <Route exact path='/' 
        render={() => <MainSideBar folders={this.state.store.folders} />}
        />
      <Route exact path='/' 
      render={props => <Main notes={this.state.store.notes} folders={this.state.store.folders} match={props.match}/>}
      />
      <Route exact path='/folder/:folderId'
      render={props => <> <MainSideBar folders={this.state.store.folders} match={props.match}/> 
      <Main notes={this.state.store.notes} folders={this.state.store.folders} match={props.match}/>
      </>}
      />

      <Route exact path='/note/:noteId'
      render={props => <Note notes={this.state.store.notes} folders={this.state.store.folders} match={props.match} history={props.history}/>}/>
    </div>
  );
}
}

export default App;
