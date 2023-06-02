import React from 'react';
import UserList from './UserList';
import { ReactComponent as GroupIcon } from './icons/group.svg';
import './index.css';

function App() {
  return(
    <div style={{backgroundColor: "#f1f5f6"}}>
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "white",
        height: "64px"
      }}>
        <GroupIcon fill='#2081C3'/>
        <header style={{fontSize: '18px', textTransform: 'uppercase', color: '#4A4A4A'}}>USERS</header>
      </div>
      <UserList/>
    </div>
  )
    
}

export default App;
