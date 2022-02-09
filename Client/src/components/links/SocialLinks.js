import "./SocialLinks.css";
import SocialBtn from "../buttons/SocialBtn";

export default function SocialLinks({
    address,
    following_count,
    followers_count
}) {
    return (
        <div className="social-links">
            <SocialBtn
                address={address}
                label="following"
                value={following_count}
                path="following"
            />
            <SocialBtn
                address={address}
                label="followers"
                value={followers_count}
                path="followers"
            />
        </div>
    );
}
