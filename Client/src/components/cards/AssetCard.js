import "./AssetCard.css";
import DEFAULT_IMAGE from "../../assets/placeholder.png";
import { intlCurrNumFormat, intlDecimalNumFormat } from "../../helpers/functions";

export default function AssetCard({
    balance,
    contract_address,
    currency,
    logo,
    name,
    quote,
    symbol
}) {
    return (
        <a
            className="asset-card"
            href={`https://etherscan.io/address/${contract_address}`}
            target="_blank"
            rel="noreferrer"
        >
            <div className="asset-card__img">
                <img src={logo}  alt={symbol} onError={(e) => { e.target.src = DEFAULT_IMAGE }} ></img>
            </div>
            <div className="asset-card__details">
                <div className="asset-card__details__title">
                    <h3>{name}</h3>
                </div>
            </div>
            <div className="asset-card__balance">
                <div >{intlCurrNumFormat(quote, currency)}</div>
                <div>{intlDecimalNumFormat(balance)}</div>
            </div>
        </a>
    );
}
