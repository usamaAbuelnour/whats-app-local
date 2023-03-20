import classes from './Toolbar.css';
import {BsCamera} from 'react-icons/bs';
import {IoIosSearch} from 'react-icons/io';
import {RxDotsVertical} from 'react-icons/rx';
import NavBar from '../NavBar/NavBar';

export default function Toolbar() {
  return (
    <div className={classes.toolbar}>
        <span className={classes.whatsapp} > WhatsApp </span>
        <div className={classes.toolbarIco}>
            <span><BsCamera /></span>
            <span><IoIosSearch /></span>
            <span><RxDotsVertical /></span>
        </div>
        <NavBar />
    </div>
  )
}

