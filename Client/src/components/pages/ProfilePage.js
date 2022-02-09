import { useEffect, useContext, useState } from "react";
import "./ProfilePage.css";
import {
    useParams,
    Navigate,
    Outlet
} from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import Layout from "../layout/Layout";
import Breadcrum from "../main/Breadcrum";
import ProfileCard from "../cards/ProfileCard";
import Loading from "../main/Loading";
import ErrorMsg from "../main/ErrorMsg";
import Modal from "../main/Modal";

export default function ProfilePage() {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);
    const state = profileContext.state;
    const netWorth = profileContext.netWorth;
    const assetsCount = profileContext.assetsCount;
    const nftsCount = profileContext.nftsCount;
    const poapsCount = profileContext.poapsCount;
    const stateCommonData = profileContext.stateCommon.data;
    const isFollowingProfile = authContext.isFollowingProfile;
    const account = authContext.account;
    const address = useParams().user;
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        profileContext.setAddress(address);
    }, [address, profileContext]);   

    if(!account || !address) {
        return <Navigate to="/"/>
    }

    if(state.loading) return (
        <Layout>
            <div className="content__column column__left">
                <Loading />
           </div>
        </Layout>
    );

    if(state.error) return (
        <Layout>
            <div className="content__column column__left">
                <ErrorMsg message={state.error} />
           </div>
        </Layout>
    );

    return (
        <Layout>
            <Modal
                showModal={showModal}
                setShowModal={setShowModal}
                stateCommonData={stateCommonData}
            />
            <div className="content__column column__left">
                {
                    state.data.address &&
                    <Breadcrum address={address} />
                }
                {
                    state.data.address &&
                    <ProfileCard
                        address={state.data.address}
                        socialAddress={address}
                        account={account}
                        domain={state.data.domain}
                        social={state.data.social}
                        following_count={state.data.following_count}
                        followers_count={state.data.followers_count}
                        is_following={state.data.is_following}
                        is_followed={state.data.is_followed}
                        image_url={state.data.image_url}
                        join_date={state.data.join_date}
                        netWorth={netWorth}
                        assetsCount={assetsCount}
                        nftsCount={nftsCount}
                        poapsCount={poapsCount}
                        isFollowingProfile={isFollowingProfile}
                        setIsFollowingProfile={authContext.setIsFollowingProfile}
                        setShowModal={setShowModal}
                        stateCommonData={stateCommonData}
                    />
                }
                <Outlet />
            </div>
        </Layout>
    );
}
