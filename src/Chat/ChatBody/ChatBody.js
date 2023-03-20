import Message from '../Message/Message';
import classes from './ChatBody.css';
import ScrollToBottom from 'react-scroll-to-bottom';
import {HiLockClosed} from 'react-icons/hi';

export default function ChatBody({fullChat}) {
  return (
    

    // scroll   nice moooooooooooooove 

    <ScrollToBottom className={classes.scroll}>
      <div className={classes.chatbody}>
        


        <div className={classes.encrypMessage}>

            <p><HiLockClosed /> Messages and calls are end-to-end encrypted.<br/>
            No one outside of this chat, not even whatsApp,<br/>
            can read or listen to them. Tap to learn more. </p>
            
        </div>

            {fullChat.map(message=><Message key={Math.random()}
            message={message} />)}

      </div>
    </ScrollToBottom>

    
  )
}
