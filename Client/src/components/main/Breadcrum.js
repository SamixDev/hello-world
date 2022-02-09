import "./Breadcrum.css";
import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { trimAddress } from "../../helpers/functions";

export default function Breadcrum({ address }) {
    return (
        <div className="breadcrum">
            <Link
                to="/explore"
                className="breadcrum-link"
            >
                <AiOutlineArrowLeft />
                <div>{trimAddress(address)}</div>
            </Link>
        </div>
    );
}
