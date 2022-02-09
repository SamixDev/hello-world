import { useContext } from "react";
import "./Panel.css";
import { DEVS } from "../../helpers/constants";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import { useParams } from "react-router-dom";
import SocialCard from "../cards/SocialCard";
import WalletBtn from "../buttons/WalletBtn";

export default function Panel() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const account = authContext.account;
    const domain = authContext.domain;
    const domainImg = authContext.domainImg;
    const handleLogout = authContext.handleLogout;
    const isFollowingProfile = authContext.isFollowingProfile;
    const recommendedData = dataContext.recommendedData;
    const address = useParams().user;

    return (
        <aside className="panel">
            <WalletBtn
                account={account}
                domain={domain}
                domainImg={domainImg}
                handleLogout={handleLogout}
            />
            <div className="column">
                <h2>Hello World</h2>
                <div className="panel-description">
                A warm welcome from the devs behind the project! ❤️
                </div>
                <div className="panel-list">
                    {
                        DEVS.map((elem, ind) => (
                            <SocialCard
                                key={ind}
                                account={account}
                                address={address}
                                socialAddress={elem.address}
                                avatar={elem.avatar}
                                domain={elem.domain}
                                recommendation_reason={elem.recommendation_reason}
                                isFollowingProfile={isFollowingProfile}
                                setIsFollowingProfile={authContext.setIsFollowingProfile}
                            />
                        ))
                    }
                </div>
            </div>
            {
                recommendedData.length > 0 &&
                <div className="column">
                    <h2>You might like</h2>
                    <div className="panel-list">
                        {
                            recommendedData.map((elem, ind) => (
                                <SocialCard
                                    key={ind}
                                    account={account}
                                    address={address}
                                    socialAddress={elem.address}
                                    avatar={elem.avatar}
                                    domain={elem.domain}
                                    recommendation_reason={elem.recommendation_reason}
                                    isFollowingProfile={isFollowingProfile}
                                    setIsFollowingProfile={authContext.setIsFollowingProfile}
                                />
                            ))
                        }
                    </div>
                </div>
            }
        </aside>
    );
}
