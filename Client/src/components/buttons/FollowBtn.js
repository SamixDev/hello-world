import { useContext, useEffect, useState } from "react";
import "./FollowBtn.css";
import { AuthContext } from "../../context/AuthContext";
import { checkFollow } from "../../api";
import { isAbortError } from "../../helpers/functions";

export default function FollowBtn({
    account,
    address,
    socialAddress,
    isFollowingProfile,
    setIsFollowingProfile,
}) {
    const authContext = useContext(AuthContext);
    const [isFollowing, setIsFollowing] = useState(null);
    const [text, setText] = useState("");
    const [profileText, setProfileText] = useState("");
    const checkAddress = address 
        ? address.toLowerCase() === socialAddress.toLowerCase()
        : false;

    useEffect(() => {
        if(!account || !socialAddress) return;
        const query = checkFollow(account, socialAddress);
        query
            .then(res => {
                if(checkAddress) {
                    setIsFollowingProfile(res.is_following);
                } else {
                    setIsFollowing(res.is_following);
                }
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                } else {
                    console.error(err.message);
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, socialAddress, checkAddress, setIsFollowingProfile]);

    useEffect(() => {
        if(checkAddress) {
            setProfileText(
                isFollowingProfile 
                ? "Following" 
                : "Follow"
            );
        } else {
            setText(isFollowing 
                ? "Following" 
                : "Follow");
        }

    }, [isFollowing, isFollowingProfile, checkAddress]);

    const handleOnMouseEnter = () => {
        if(checkAddress) {
            setProfileText(isFollowingProfile ? "Unfollow" : "Follow");
        } else {
            setText(isFollowing ? "Unfollow" : "Follow");
        }
    }

    const handleOnMouseLeave = () => {
        if(checkAddress) {
            setProfileText(isFollowingProfile ? "Following" : "Follow");
        } else {
            setText(isFollowing ? "Following" : "Follow");
        }
    }

    const handleOnClick = async (e) => {
        e.stopPropagation();
        e.preventDefault();
        if(checkAddress) {
            if(isFollowingProfile) {
                try {
                    await authContext.cyberConnect.disconnect(socialAddress);
                    setIsFollowingProfile(false);
                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            } else {
                try {
                    await authContext.cyberConnect.connect(socialAddress);
                    setIsFollowingProfile(true);
                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            }
        } else {
            if(isFollowing) {
                try {
                    await authContext.cyberConnect.disconnect(socialAddress);
                    setIsFollowing(false);
                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            } else {
                try {
                    await authContext.cyberConnect.connect(socialAddress);
                    setIsFollowing(true);
                } catch (error) {
                    alert(`Error: ${error.message}`);
                }
            }
        }
    }

    return (
        <div className="follow-btn">
            {
                !checkAddress &&
                <button
                    className={`${isFollowing ? "isFollowing" : ""}`}
                    onClick={handleOnClick}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                >
                    {text}
                </button>
            }
            {
                checkAddress &&
                <button
                    className={`${isFollowingProfile ? "isFollowing" : ""}`}
                    onClick={handleOnClick}
                    onMouseEnter={handleOnMouseEnter}
                    onMouseLeave={handleOnMouseLeave}
                >
                    {profileText}
                </button>
            }
        </div>
    );
}
