import "./NftCard.css";
import { trimTokenId, timeSince } from "../../helpers/functions";

export default function NftCard({
    title,
    image,
    description,
    token_address,
    token_id,
    date
}) {
    return (
        <a
            className="nft-card"
            href={`https://opensea.io/assets/${token_address}/${token_id}`}
            target="_blank"
            rel="noreferrer"
        >
            <div className="nft-card__img">
                <img
                    src={image}
                    alt={title}
                ></img>
            </div>
            <div className="nft-card__details">
                <div className="nft-card__details__title">
                    <div>
                        <h3>{title}</h3>
                        <h4>#{trimTokenId(token_id)}</h4>
                    </div>
                    {
                        date &&
                        <div>{timeSince(new Date(date))}</div>
                    }
                </div>
                <div>{description}</div>
            </div>

        </a>
    );
}
