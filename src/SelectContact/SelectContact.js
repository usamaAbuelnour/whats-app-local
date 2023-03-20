import {IoIosSearch, IoMdPersonAdd} from 'react-icons/io';
import {RxDotsVertical} from 'react-icons/rx';
import {BsArrowLeftShort} from 'react-icons/bs';
import {MdGroup, MdGroups} from 'react-icons/md';
import classes from './SelectContact.css';
import { Link ,Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import NewContact from './NewContact/NewContact';

export default function SelectContact(props) {

    const navigate = useNavigate();
    const location = useLocation();

 

    return (
        
        location.pathname === '/chats/select-contact' ?

            <div className={classes.selectcontact}>
                <div className={classes.toolbar}>


                    <span className={classes.arrow} onClick={()=>navigate(-1)}>
                    <BsArrowLeftShort /></span>


                    <span>Select Contact</span>

                    <div className={classes.toolbarIco}>
                        <span><RxDotsVertical /></span>
                        <span><IoIosSearch/></span>
                        <span><RxDotsVertical /></span>
                    </div>
                </div>

                <div className={classes.new}>
                    <span><MdGroup /></span>
                    <Link className={classes.link}>New group</Link>
                </div>


                <div className={classes.new}>
                    <span><IoMdPersonAdd /></span>
                    <Link to='new-contact' className={classes.link}>New contact</Link>
                </div>


                <div className={classes.new}>
                    <span><MdGroups /></span>
                    <Link className={classes.link}>New community</Link>
                </div>
            </div>


        :

            <Routes>
                <Route path='new-contact' element={<NewContact  addContact={props.addContact} />}  />
            </Routes>


            
    )
}
