import { useState } from "react";
import "./WalletBtn.css";
import { trimAddress } from "../../helpers/functions";
import { BsChevronDown, BsChevronUp } from "react-icons/bs";
import { FaWallet } from "react-icons/fa";
import LogoutBtn from "./LogoutBtn";
import udIcon from "../../assets/ud-logo.png";

export default function WalletBtn({
    domain,
    domainImg,
    handleLogout
}) {
    const [showButton, setShowButton] = useState(false);
    const domainCheck = domain?.split("").indexOf(".") !== -1;

    const handleOnMouseEnter = () => {
        setShowButton(true);
    }

    const handleOnMouseLeave = () => {
        setShowButton(false);
    }

    return (
        <div
            className={`wallet-btn ${showButton ? "active" : ""}`}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
        >
            <button className="wallet-btn__address">
                {
                    domainCheck &&
                    !domainImg &&
                    <img src={udIcon} alt="ud logo"></img>
                }
                {
                    domainCheck &&
                    domainImg &&
                    <img src={domainImg} alt="domain"></img>
                }
                {
                    !domainCheck &&
                    <FaWallet />
                }
                {trimAddress(domain, 6)}
                {
                    !showButton &&
                    <BsChevronDown color="var(--purple)" />
                }
                {
                    showButton &&
                    <BsChevronUp color="var(--purple)" />
                }
            </button>
            {
                showButton &&
                <LogoutBtn handleLogout={handleLogout}/>
            }
        </div>
    );
}
