import { Route, Routes } from 'react-router-dom';
import classes from './App.css';
import Chats from './Chats/Chats';
import Home from './Home/Home';
import Profile from './Profile/Profile';
import io from 'socket.io-client';
import { useEffect, useRef } from 'react';
import Chat from './Chat/Chat';
import SelectContact from './SelectContact/SelectContact';

export const socket = io.connect('http://localhost:2000');

function App() {

  return (
    <div className="classes.app">
      <Routes>
        <Route  path='' element={<Home />} />
        <Route path='profile' element={<Profile socket={socket} />} />
        <Route  path='chats/*' element={<Chats socket={socket} />} />
        
      </Routes>
    </div>
  );
}

export default App;
