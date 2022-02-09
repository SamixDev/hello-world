import "./ActivityCard.css";
import {
    trimAddress,
    trimTokenId,
    timeSince,
    intlCompactNumFormat
} from "../../helpers/functions";
import DEFAULT_IMAGE from "../../assets/placeholder.png";
import { BsArrowRightSquare, BsArrowLeftSquare } from "react-icons/bs";

export default function ActivityCard({
    tx_hash,
    tx_type,
    time,
    type,
    token_id,
    sender,
    receiver,
    logo,
    value,
    symbol
}) {
    return (
        <a
            className="activity-card"
            href={`https://etherscan.io/tx/${tx_hash}`}
            target="_blank"
            rel="noreferrer"
        >
            <div className={`activity-card__icon ${tx_type}`}>
                {
                    tx_type === "in" &&
                    <BsArrowLeftSquare />
                }
                {
                    tx_type === "out" &&
                    <BsArrowRightSquare />
                }
            </div>
            <div className="activity-card__details">
                {
                    tx_type === "in" &&
                    <div className="activity-card__details__in">
                        {
                            type === "erc721" &&
                            <div>Received Non-Fungible Token <strong>#{trimTokenId(token_id)}</strong> from <strong>{trimAddress(sender)}</strong>.</div>
                        }
                        {
                            type === "erc20" &&
                            <div>Received <strong>{<img src={logo ? logo : DEFAULT_IMAGE} alt={symbol}></img>} {symbol} {intlCompactNumFormat(value)}</strong> from <strong>{trimAddress(sender)}</strong>.</div>
                        }
                    </div>
                }
                {
                    tx_type === "out" &&
                    <div className="activity-card__details__out">
                        {
                            type === "erc721" &&
                            <div>Sent Non-Fungible Token <strong>#{trimTokenId(token_id)}</strong> to <strong>{trimAddress(receiver)}</strong>.</div>
                        }
                        {
                            type === "erc20" &&
                            <div>Sent <strong><img src={logo ? logo : DEFAULT_IMAGE} alt={symbol}></img> {symbol} {intlCompactNumFormat(value)}</strong> to <strong>{trimAddress(receiver)}</strong>.</div>
                        }
                    </div>
                }
            </div>
            <div className="activity-card__time">
                {timeSince(new Date(time))}
            </div>
        </a>
    );
}
