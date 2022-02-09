import "./SocialBtn.css";
import { Link } from "react-router-dom";
import { intlCompactNumFormat } from "../../helpers/functions";

export default function SocialBtn({
    address,
    label,
    path,
    value
}) {
    return (
        <Link
            to={`/${address}/${path}`}
            className="social-btn"
        >
            {label}
            <div>{intlCompactNumFormat(value)}</div>
            <div>{label}</div>
        </Link>
    );
}
