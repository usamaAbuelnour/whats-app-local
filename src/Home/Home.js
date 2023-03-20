
import classes from './Home.css';
import { Link } from 'react-router-dom';
import logo from '../images/home_logo_rz.jpg';
export default function Home() {
  return (

        <div className={classes.home}>

            <h2>Welcome to WhatsApp</h2>

            <div className={classes.homelogo} >
              <img src={logo} />
            </div>

            <p>Read our <span>Privacy Policy.</span> Tap "Agree and continue"
            to accept the <span>Terms of Service</span>.</p>
           
            <Link to='profile' className={classes.link}>AGREE AND CONTINUE</Link>
       
        </div>

  )
}
