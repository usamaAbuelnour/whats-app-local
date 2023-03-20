import classes from './Contact.css';
import {FaUserAlt} from 'react-icons/fa';

export default function Contact(props) {
  return (
    <div className={classes.contact} onClick={props.clicked}>
        <div className={classes.image}>
          <FaUserAlt />
        </div>
        <span className={classes.name}>{props.name}</span>
        <span className={classes.time}>yesterday</span>
    </div>
  )
}
