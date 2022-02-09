import { useContext } from "react";
import "./ProfilePage.css";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { DataContext } from "../../context/DataContext";
import Layout from "../layout/Layout";
import Loading from "../main/Loading";
import ErrorMsg from "../main/ErrorMsg";
import FeaturedCard from "../cards/FeaturedCard";
import Search from "../main/Search";

export default function ExplorePage() {
    const authContext = useContext(AuthContext);
    const dataContext = useContext(DataContext);
    const stateFeaturedData = dataContext.stateFeaturedData;
    const isFollowingProfile = authContext.isFollowingProfile;
    const account = authContext.account;

    if(!account) {
        return <Navigate to="/"/>
    }

    if(stateFeaturedData.loading) return (
        <Layout>
            <div className="content__column column__left">
                <Loading />
           </div>
        </Layout>
    );

    if(stateFeaturedData.error) return (
        <Layout>
            <div className="content__column column__left">
                <ErrorMsg message={stateFeaturedData.error} />
           </div>
        </Layout>
    );

    return (
        <Layout>
            <div className="content__column column__left">
                <Search />
                {
                    stateFeaturedData.data.length > 0 &&
                    <div className="column">
                        {
                            stateFeaturedData.data.map((elem, ind) => (
                                <FeaturedCard
                                    key={ind}
                                    account={account}
                                    address={account}
                                    socialAddress={elem.address}
                                    avatar={elem.avatar}
                                    domain={elem.domain}
                                    balance={elem.balance}
                                    followerCount={elem.followerCount}
                                    recommendation_reason={elem.recommendation_reason}
                                    isFollowingProfile={isFollowingProfile}
                                    setIsFollowingProfile={authContext.setIsFollowingProfile}
                                />
                            ))
                        }
                    </div>
                }
            </div>
        </Layout>
    );
}
