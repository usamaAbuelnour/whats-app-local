import { useEffect, useRef, useState } from 'react';
import Contact from '../Contact/Contact';
import classes from './Chats.css';
import {BsFillChatRightTextFill} from 'react-icons/bs';
import {HiLockClosed} from 'react-icons/hi';
import Toolbar from '../Toolbar/Toolbar';
import * as contactActions from '../store/contactSlice';
import { useDispatch, useSelector } from 'react-redux';
import Chat from '../Chat/Chat';
import SelectContact from '../SelectContact/SelectContact';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import * as contactsActions from '../store/contactsSlice';

export default function Chats({socket}) {
  const dispatch = useDispatch();
  const user = useSelector(state=>state.userSlice.name);
  const contacts = useSelector(state=>state.contactsSlice);
  const location = useLocation();
  const navigate = useNavigate();
  const [win, setWin] = useState();
  


  const addContactHandler = (name) =>{
    
    dispatch(contactsActions.addContact(name));
  }
  
  useEffect(()=>{
    socket.on('DC', data=>{})
  }, [socket]);


  const clickHandler = (contact) =>{

    let myWindow = window.open('http://localhost:3000/chats/chat#'+contact.name, null,
    'popup, left=1000, top=100, width=375, height= 667');

    setWin(myWindow);


    socket.emit('join', {name: user});
    
    dispatch(contactActions.selectContact(contact));
    
    localStorage.setItem('contact', contact.name);


    localStorage.setItem('selected', JSON.stringify(contact) );


    navigate('chat');

  }

  
  return (


      location.pathname === '/chats' ?

          
        <>
            

          <Toolbar />
          
          <div className={classes.chats}>
              {contacts.map(cont=><Contact key={Math.random()} name={cont.name}
              clicked={clickHandler.bind(this, cont)} />)}
            
              <span className={classes.add}><BsFillChatRightTextFill 
              onClick={()=>navigate('select-contact')}/></span>
        
          </div>
        
          <p className={classes.p}><HiLockClosed /> Your personal messages are <span>end-to-end encrypted</span></p>

        </>


      :


        <Routes>
          <Route  path='chat' element={<Chat socket={socket} win={win} />} />

          <Route  path='select-contact/*' element={<SelectContact  addContact={addContactHandler}/>} />
        </Routes>

        
  )
}
