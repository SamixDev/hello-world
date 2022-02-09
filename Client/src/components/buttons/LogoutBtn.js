import "./LogoutBtn.css";
import { MdLogout } from "react-icons/md";

export default function LogoutBtn({ value, handleLogout }) {
    const handleOnClick = e => {
        handleLogout(e.currentTarget.value);
    }

    return (
        <button
            className="logout-btn"
            onClick={handleOnClick}
            value={value}
        >
            <MdLogout />
            <div>Logout</div>
            <div></div>
        </button>
    );
}
