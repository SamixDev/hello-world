import "./ProfileLinks.css";
import { intlCompactNumFormat } from "../../helpers/functions";
import { BiCoinStack } from "react-icons/bi";
import { GiMonaLisa } from "react-icons/gi";
import { FaAward } from "react-icons/fa";
import { BsCurrencyDollar } from "react-icons/bs";

export default function ProfileLink({
    address,
    netWorth,
    assetsCount,
    nftsCount,
    poapsCount
}) {
    return (
        <div className="profile-links">
            {
                netWorth > 0 &&
                <a
                    className="profile-links__link"
                    target="_blank"
                    href={`https://etherscan.io/address/${address}`}
                    rel="noreferrer"
                >
                    <BsCurrencyDollar />
                    <div>{intlCompactNumFormat(netWorth)}</div>
                </a>
            }
            {
                assetsCount > 0 &&
                <a
                    className="profile-links__link"
                    target="_blank"
                    href={`https://etherscan.io/tokenholdings?a=${address}`}
                    rel="noreferrer"
                >
                    <BiCoinStack />
                    <div>{intlCompactNumFormat(assetsCount)}</div>
                </a>
            }
            {
                nftsCount > 0 &&
                <a
                    className="profile-links__link"
                    target="_blank"
                    href={`https://opensea.io/${address}`}
                    rel="noreferrer"
                >
                    <GiMonaLisa />
                    <div>{intlCompactNumFormat(nftsCount)}</div>
                </a>
            }
            {
                poapsCount > 0 &&
                <a
                    className="profile-links__link"
                    target="_blank"
                    href={`https://app.poap.xyz/scan/${address}`}
                    rel="noreferrer"
                >
                    <FaAward />
                    <div>{intlCompactNumFormat(poapsCount)}</div>
                </a>
            }
        </div>
    );
}
