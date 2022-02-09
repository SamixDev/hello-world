import { useEffect, useContext } from "react";
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

export default function SocialPage() {
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);
    const account = authContext.account;
    const address = useParams().user;

    useEffect(() => {
        profileContext.setAddress(address);
    }, [address, profileContext]);

    if(!account || !address) {
        return <Navigate to="/"/>
    }

    return (
        <Layout>
            <div className="content__column column__left">
                <Breadcrum address={address} />
                <Outlet />
            </div>
        </Layout>
    );
}
