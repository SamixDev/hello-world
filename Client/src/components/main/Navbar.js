import { useContext } from "react";
import "./Navbar.css";
import { AuthContext } from "../../context/AuthContext";
import NavBtn from "../buttons/NavBtn";

export default function Navbar() {
    const authContext = useContext(AuthContext);
    const account = authContext.account;

    return (
        <nav className="navbar">
            <div className="navbar__links">
                <NavBtn
                    key={0}
                    label="Explore"
                    path="/explore"
                />
                <NavBtn
                    key={1}
                    label="Profile"
                    path={`/${account}`}
                />
            </div>
        </nav>
    );
}
