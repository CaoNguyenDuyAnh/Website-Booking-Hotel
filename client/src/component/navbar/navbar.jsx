import "./navbar.css";
import {Link, link} from "react-router-dom";
import {FaGlobe} from "react-icons/fa";
import {FaQuestionCircle} from "react-icons/fa";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
const Navbar = () => {
    const { user } = useContext(AuthContext);
    return (
        <div className="navbar">
            <div className="navContainer">
                <Link to ="/" style={{color:"inherit", textDecoration: "none"}}>
                <span className="logo">Booking.com</span>
                </Link>
                {user ? user.username:(
                <div className="navItems">
                    <button className="navBtn">Đăng ký</button>
                    <button className="navBtn">Đăng nhập</button>
                </div>
                )}
            </div>
        </div>
    )
}

export default Navbar