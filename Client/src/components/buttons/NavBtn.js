import "./NavBtn.css";
import { NavLink } from "react-router-dom";
import { BiUser } from "react-icons/bi";
import { RiHashtag } from "react-icons/ri";

export default function NavBtn({ path, label }) {
    const getIcon = () => {
        if(path === "/explore") {
            return <RiHashtag />;
        } else {
            return <BiUser />;
        }
    }

    return (
        <div className="nav-btn-wrapper">
            <NavLink
                to={path}
                className="nav-btn"
            >
                {getIcon(path)}
                <div>{label}</div>
            </NavLink>
        </div>
    );
}
