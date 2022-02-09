import React, { useState, useEffect } from "react";
import { getDomainNFT } from "../api";
import { isAbortError } from "../helpers/functions";
import CyberConnect, {
    Env,
    Blockchain,
} from "@cyberlab/cyberconnect";
import UAuth from "@uauth/js";

const uauth = new UAuth({
    clientID: process.env.REACT_APP_UD_CLIENT_ID,
    clientSecret: process.env.REACT_APP_UD_CLIENT_SECRET,
    scope: process.env.REACT_APP_UD_SCOPE,
    redirectUri: process.env.REACT_APP_UD_REDIRECT_URI,
});

export const AuthContext = React.createContext();
AuthContext.displayName = "AuthProvider";

export default function AuthProvider({ children }) {
    const [account, setAccount] = useState(null);
    const [domain, setDomain] = useState(null);
    const [isFollowingProfile, setIsFollowingProfile] = useState(false);
    const provider = window.ethereum;

    const cyberConnect = new CyberConnect({
        namespace: "CyberConnect",
        env: Env.PRODUCTION,
        chain: Blockchain.ETH,
        provider: provider,
    });
    const [domainImg, setDomainImg] = useState(null);

    // ~~~ Fetching NFT image for UD ~~~
    useEffect(() => {
        if(!account) return;
        if(!domain) return;
        const udCheck = domain.split("").indexOf(".") !== -1 
            ? true
            : false;
        if(!udCheck) return;
        setDomainImg(null);

        const query = getDomainNFT(domain);
        query
            .then(res => {
                setDomainImg(res);
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
    }, [account, domain]);

    // ~~~ Check for previous login with UD ~~~
    useEffect(() => {
        uauth
            .user()
            .then(res => {
                setDomain(res.sub);
                setAccount(res.wallet_address);
        })
        .catch(err => console.error(err.message));
    }, []);

    const handleLogin = async (value) => {
        if(value === "ud") {
            uauth
                .loginWithPopup()
                .then(res => {
                    setDomain(res.idToken.sub);
                    setAccount(res.idToken.wallet_address);
                })
                .catch(err => console.error(err.message));
        }

        if(value === "mm") {
            if (provider) {
                try {
                    const res = await provider.request({
                        method: 'eth_requestAccounts',
                    });
                    setDomain(res[0]);
                    setAccount(res[0]);
                } catch (error) {
                    alert("Something went wrong. Please try again!");
                }
            } else {
                alert("Please install the MetaMask extension!");
            }
        }
    }

    const handleLogout = async () => {
        uauth
        .logout()
        .catch(err => console.error(err.message))
        .finally(() => {
            setAccount(null);
            setDomain(null);
        });
    }

    return (
        <AuthContext.Provider
            value={{
                account: account,
                domain: domain,
                domainImg: domainImg,
                cyberConnect: cyberConnect,
                isFollowingProfile: isFollowingProfile,
                setIsFollowingProfile: setIsFollowingProfile,
                handleLogin: handleLogin,
                handleLogout: handleLogout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}
