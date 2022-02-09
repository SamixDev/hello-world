import { useContext, useEffect, useRef } from "react";
import "./SocialTabs.css";
import { FOLLOW_PATHS } from "../../helpers/constants";
import { getPathFromLocation } from "../../helpers/functions";
import { AuthContext } from "../../context/AuthContext";
import { ProfileContext } from "../../context/ProfileContext";
import { useLocation, useParams } from "react-router-dom";
import Loading from "../main/Loading";
import ErrorMsg from "../main/ErrorMsg";
import TabBtn from "../buttons/TabBtn";
import FollowCard from "../cards/FollowCard";

export default function SocialTabs() {
    const observeFollowersRef = useRef(null);
    const observeFollowingRef = useRef(null);
    const authContext = useContext(AuthContext);
    const profileContext = useContext(ProfileContext);
    const stateFollowers = profileContext.stateFollowers;
    const stateFollowing = profileContext.stateFollowing;
    const isFollowingProfile = profileContext.isFollowingProfile;
    const setPageFollowers = profileContext.setPageFollowers;
    const setPageFollowing = profileContext.setPageFollowing;
    const followers_count = profileContext.state.data.followers_count;
    const following_count = profileContext.state.data.following_count;
    const account = authContext.account;
    const address = useParams().user;
    const path = getPathFromLocation(useLocation());

    useEffect(() => {
        const target = observeFollowersRef?.current;
        if(!target) return;
        if(!(path === "followers")) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        let handleObserver = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setPageFollowers(prev => {
                        const newPage = prev + 1;
                        if(newPage * 20 < followers_count) {
                            return newPage;
                        } else {
                            return prev;
                        }                        
                    });
                }
            });
          };

        const observer = new IntersectionObserver(handleObserver, options);

        if(target) {
            observer.observe(target);
        }

        return () => {
            if(target) {
                observer.unobserve(target);
            }
        }
    }, [followers_count, setPageFollowers, observeFollowersRef, path]);

    useEffect(() => {
        const target = observeFollowingRef?.current;
        if(!target) return;
        if(!(path === "following")) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        let handleObserver = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setPageFollowing(prev => {
                        const newPage = prev + 1;
                        if(newPage * 20 < following_count) {
                            return newPage;
                        } else {
                            return prev;
                        }                        
                    });
                }
            });
          };

        const observer = new IntersectionObserver(handleObserver, options);

        if(target) {
            observer.observe(target);
        }

        return () => {
            if(target) {
                observer.unobserve(target);
            }
        }
    }, [following_count, setPageFollowing, observeFollowingRef, path]);

    return (
        <div className="social-tabs">
            <div className="social-tabs__links">
                {
                    FOLLOW_PATHS.map((elem, ind) => (
                        <TabBtn
                            key={ind}
                            address={address}
                            path={elem.path}
                            label={elem.label}
                        />
                    ))
                }
            </div>
            {
                path === "followers" &&
                <div>
                    {
                        stateFollowers.loading &&
                        <Loading />
                    }
                    {
                        stateFollowers.error &&
                        <ErrorMsg message={stateFollowers.error} />
                    }
                    {
                        stateFollowers.data?.length > 0 &&
                        stateFollowers.data.map((elem, ind) => (
                            <FollowCard
                                key={ind}
                                account={account}
                                address={address}
                                avatar={elem.avatar}
                                domain={elem.domain}
                                socialAddress={elem.address}
                                isFollowingProfile={isFollowingProfile}
                                setIsFollowingProfile={authContext.setIsFollowingProfile}
                            />
                        ))
                    }
                </div>
            }
            {
                path === "following" && 
                <div>
                    {
                        stateFollowing.loading &&
                        <Loading />
                    }
                    {
                        stateFollowing.error &&
                        <ErrorMsg message={stateFollowing.error} />
                    }
                    {
                        stateFollowing.data?.length > 0 &&
                        stateFollowing.data.map((elem, ind) => (
                            <FollowCard
                                key={ind}
                                account={account}
                                address={address}
                                avatar={elem.avatar}
                                domain={elem.domain}
                                socialAddress={elem.address}
                                isFollowingProfile={isFollowingProfile}
                                setIsFollowingProfile={authContext.setIsFollowingProfile}
                            />
                        ))
                    }
                </div>
            }
            <div ref={observeFollowersRef} className="observer"></div>
            <div ref={observeFollowingRef} className="observer"></div>
        </div>
    );
}
