import "./FeaturedCard.css";
import { Link } from "react-router-dom";
import { trimAddress } from "../../helpers/functions";
import FollowBtn from "../buttons/FollowBtn";

export default function FeaturedCard({
    account,
    address,
    socialAddress,
    avatar,
    domain,
    recommendation_reason,
    isFollowingProfile,
    setIsFollowingProfile,
}) {
    return (
        <Link
            to={`/${socialAddress}/`}
            className={`featured-card`}
        >
            <div className="featured-card__img">
                {
                    avatar &&
                    <img
                        src={avatar}
                        alt="profile"
                    ></img>
                }
            </div>
            <div className="featured-card__details">
                <div className="featured-card__details__address">
                    {domain ? domain : trimAddress(socialAddress)}
                </div>
                <div className="featured-card__details__recommendation">
                    {recommendation_reason}
                </div>
            </div>
            <FollowBtn
                account={account}
                address={address}
                socialAddress={socialAddress}
                isFollowingProfile={isFollowingProfile}
                setIsFollowingProfile={setIsFollowingProfile}
            />
        </Link>
    );
}
