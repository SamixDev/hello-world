import React, { useContext, useState, useEffect } from "react";
import {
    getProfile,
    getBalanceData,
    getPoapData,
    getNFTData,
    getTransfersData,
    getCommon
} from "../api";
import { AuthContext } from "./AuthContext";
import { isAbortError } from "../helpers/functions";

export const ProfileContext = React.createContext();
ProfileContext.displayName = "ProfileProvider";

export default function ProfileProvider({ children }) {
    const authContext = useContext(AuthContext);
    const account = authContext.account;
    const [address, setAddress] = useState(undefined);

    // ~~~ Data ~~~
    const [netWorth, setNetWorth] = useState(10);
    const [assetsCount, setAssetsCount] = useState(100);
    const [nftsCount, setNftsCount] = useState(0);
    const [poapsCount, setPoapsCount] = useState(0);
    // ~~~ Keeping tabs on loading, error and success ~~~
    const [state, setState] = useState({
        data: {},
        loading: true,
        error: ""
    });
    const [stateBalance, setStateBalance] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateNft, setStateNft] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [statePoap, setStatePoap] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateActivity, setStateActivity] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [stateCommon, setCommon] = useState({
        data: {},
        loading: true,
        error: ""
    });

    // ~~~ API calls ~~~
    // ~~~ Fetching data for the Profile ~~~
    useEffect(() => {
        if(!account || !address) return;
        setState({
            data: {},
            loading: true,
            error: ""
        });

        const query = getProfile(account, address);
        query
            .then(res => {
                setState({
                    data: res,
                    loading: false,
                    error: ""
                });
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setState({
                        data: {},
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setState({
                        data: {},
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, address]);

    // ~~~ Fetching data for Balance ~~~
    useEffect(() => {
        if(!account || !address) return;
        setStateBalance({
            data: [],
            loading: true,
            error: ""
        });
        setNetWorth(0);
        setAssetsCount(0);

        const query = getBalanceData(address);
        query
            .then(res => {
                setStateBalance({
                    data: res.tokens,
                    loading: false,
                    error: ""
                });
                const worth = res.tokens.reduce((acc, cur) => {
                    return acc + cur.quote;
                }, 0);
                setNetWorth(worth);
                setAssetsCount(res.tokens.length);
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setStateBalance({
                        data: [],
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setStateBalance({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, address]);

    // ~~~ Fetching data for NFTs ~~~
    useEffect(() => {
        if(!account || !address) return;
        setStateNft({
            data: [],
            loading: true,
            error: ""
        });
        setNftsCount(0);

        const query = getNFTData(address);
        query
            .then(res => {
                setStateNft({
                    data: res,
                    loading: false,
                    error: ""
                });
                setNftsCount(res.length);
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setStateNft({
                        data: [],
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setStateNft({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, address]);

    // ~~~ Fetching data for POAPs ~~~
    useEffect(() => {
        if(!account || !address) return;
        setStatePoap({
            data: [],
            loading: true,
            error: ""
        });
        setPoapsCount(0);

        const query = getPoapData(address);
        query
            .then(res => {
                setStatePoap({
                    data: res,
                    loading: false,
                    error: ""
                });
                setPoapsCount(res.length);
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setStatePoap({
                        data: [],
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setStatePoap({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, address]);

    // ~~~ Fetching data for Activity ~~~
    useEffect(() => {
        if(!account || !address) return;
        setStateActivity({
            data: [],
            loading: true,
            error: ""
        });

        const query = getTransfersData(address);
        query
            .then(res => {
                setStateActivity({
                    data: res,
                    loading: false,
                    error: ""
                });
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setStateActivity({
                        data: [],
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setStateActivity({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, address]);

    // ~~~ Fetching data for Common ~~~
    useEffect(() => {
        if(!account || !address) return;
        setCommon({
            data: {},
            loading: true,
            error: ""
        });
        if(account.toLowerCase() === address.toLowerCase()) return;

        const query = getCommon(account, address);
        query
            .then(res => {
                setCommon({
                    data: res,
                    loading: false,
                    error: ""
                });
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setCommon({
                        data: [],
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setCommon({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account, address]);

    return (
        <ProfileContext.Provider
            value={{
                address: address,
                state: state,
                netWorth: netWorth,
                assetsCount: assetsCount,
                nftsCount: nftsCount,
                poapsCount: poapsCount,
                stateBalance: stateBalance,
                stateNft: stateNft,
                statePoap: statePoap,
                stateActivity: stateActivity,
                stateCommon: stateCommon,
                setAddress: setAddress
            }}
        >
            {children}
        </ProfileContext.Provider>
    );
}
