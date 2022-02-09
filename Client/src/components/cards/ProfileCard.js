import "./ProfileCard.css";
import { AiOutlineCalendar } from "react-icons/ai";
import { BiNetworkChart } from "react-icons/bi";
import { RiTwitterLine } from "react-icons/ri";
import {
    intlShortDateFormat,
    trimAddress
} from "../../helpers/functions";
import FollowBtn from "../buttons/FollowBtn";
import ProfileLinks from "../links/ProfileLinks";
import SocialLinks from "../links/SocialLinks";
import CommonBtn from "../buttons/CommonBtn";

export default function ProfileCard({
    address,
    account,
    socialAddress,
    domain,
    social,
    following_count,
    followers_count,
    is_followed,
    image_url,
    join_date,
    netWorth,
    assetsCount,
    nftsCount,
    poapsCount,
    isFollowingProfile,
    setIsFollowingProfile,
    stateCommonData,
    setShowModal
}) {

    return (
        <div className="profile-card">
            <div className="profile-card__banner">
                <div className="profile-card__banner__img">
                    {
                        image_url &&
                        <img
                            src={image_url}
                            alt="profile"
                        ></img>
                    }
                </div>
            </div>
            <div className="profile-card__details">
                <div className="profile-card__details__follow-btn">
                    {
                        (address.toLowerCase() !== account.toLowerCase()) &&
                        <FollowBtn
                            account={account}
                            address={address}
                            socialAddress={socialAddress}
                            isFollowingProfile={isFollowingProfile}
                            setIsFollowingProfile={setIsFollowingProfile}
                        />
                    }
                </div>
                <div className="profile-card__details__title">
                    <h2>{domain ? domain : trimAddress(address)}</h2>
                    {
                        is_followed &&
                        (address.toLowerCase() !== account.toLowerCase()) &&
                        <div>follows you</div>
                    }
                </div>
                {
                    social !== "" &&
                    <div className="profile-links__social-link">
                        <a
                            target="_blank"
                            href={`https://twitter.com/${social}`}
                            rel="noreferrer"
                        >
                            <RiTwitterLine />
                            <div>{social}</div>
                        </a>
                    </div>
                }
                <ProfileLinks
                    address={address}
                    netWorth={netWorth}
                    assetsCount={assetsCount}
                    nftsCount={nftsCount}
                    poapsCount={poapsCount}
                />
                <div className="profile-card__details__network">
                    <div className="profile-card__details__network__entry">
                        <BiNetworkChart />
                        <div>Ethereum</div>
                    </div>
                    <div className="profile-card__details__network__entry">
                        <AiOutlineCalendar />
                        <div>{intlShortDateFormat(new Date(join_date))}</div>
                    </div>
                </div>
                <SocialLinks
                    address={address}
                    following_count={following_count}
                    followers_count={followers_count}
                />
                <CommonBtn
                    setShowModal={setShowModal}
                    stateCommonData={stateCommonData}
                />
            </div>
        </div>
    );
}
