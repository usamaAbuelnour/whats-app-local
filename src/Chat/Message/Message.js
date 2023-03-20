import classes from './Message.css'; 

export default function Message(props) {
  const messageClasses = [classes.message];

  if(props.message.you) messageClasses.push(classes.you)
    

  return (
    <div className={messageClasses.join(' ')}>
        
        {props.message.content}

    </div>
  )
}
