import "./FollowCard.css";
import { Link } from "react-router-dom";
import FollowBtn from "../buttons/FollowBtn";
import { trimAddress } from "../../helpers/functions";

export default function FollowCard({
    account,
    address,
    avatar,
    domain,
    socialAddress,
    isFollowingProfile,
    setIsFollowingProfile,
}) {
    return (
        <Link
            to={`/${socialAddress}/`}
            className={`follow-card`}
        >
            <div className="follow-card__img">
                {
                    avatar &&
                    <img
                        src={avatar}
                        alt="profile"
                    ></img>
                }
            </div>
            <div className="follow-card__details">
                {domain ? domain : trimAddress(socialAddress, 6)}
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
