import "./PoapCard.css";
import { timeSince } from "../../helpers/functions";

export default function PoapCard({
    name,
    created,
    description,
    image_url,
    token_id
}) {
    return (
        <a
            className="poap-card"
            href={`https://app.poap.xyz/token/${token_id}`}
            target="_blank"
            rel="noreferrer"
        >
            <div className="poap-card__img">
                <img
                    src={image_url}
                    alt={name}
                ></img>
            </div>
            <div className="poap-card__details">
                <div className="poap-card__details__title">
                    <h3>{name}</h3>
                    <div>{timeSince(new Date(created))}</div>
                </div>
                <div>{description}</div>
            </div>
        </a>
    );
}
