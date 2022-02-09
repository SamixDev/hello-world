import "./TabBtn.css";
import { NavLink } from "react-router-dom";

export default function TabBtn({
    address,
    path,
    label
}) {
    return (
        <NavLink
            to={`/${address}/${path}`}
            className={`tab-btn`}
        >
            {label}
            <div>{label}</div>
        </NavLink>
    );
}
