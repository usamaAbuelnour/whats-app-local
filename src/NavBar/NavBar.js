import classes from './NavBar.css';
import {MdGroups} from 'react-icons/md';
import { NavLink } from 'react-router-dom';

export default function NavBar() {
  return (
    <div className={classes.navbar}>
        <nav>
            <NavLink to='/'><MdGroups /></NavLink>
            <NavLink to='/chats'>CHATS</NavLink>
            <NavLink to='/'>STATUS</NavLink>
            <NavLink to='/'>CALLS</NavLink>
        </nav>
    </div>
  )
}
