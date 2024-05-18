import React from 'react';
import UserList from './components/UserList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>User List</h1>
        <UserList />
      </header>
    </div>
  );
}

export default App;