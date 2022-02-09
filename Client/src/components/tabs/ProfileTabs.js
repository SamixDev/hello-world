import { useContext, useEffect, useRef, useState } from "react";
import "./ProfileTabs.css";
import { PROFILE_PATHS } from "../../helpers/constants";
import { getPathFromLocation } from "../../helpers/functions";
import { ProfileContext } from "../../context/ProfileContext";
import { useLocation, useParams } from "react-router-dom"
import Loading from "../main/Loading";
import ErrorMsg from "../main/ErrorMsg";
import TabBtn from "../buttons/TabBtn";
import AssetCard from "../cards/AssetCard";
import NftCard from "../cards/NftCard";
import PoapCard from "../cards/PoapCard";
import ActivityCard from "../cards/ActivityCard";

export default function ProfileTabs() {
    const page_limit = 5;
    const profileContext = useContext(ProfileContext);
    const stateBalance = profileContext.stateBalance;
    const stateNft = profileContext.stateNft;
    const statePoap = profileContext.statePoap;
    const stateActivity = profileContext.stateActivity;
    const path = getPathFromLocation(useLocation());
    const address = useParams().user;
    const observeBalanceRef = useRef(null);
    const observeNftRef = useRef(null);
    const observePoapRef = useRef(null);
    const observeActivityRef = useRef(null);
    const [pageBalance, setPageBalance] = useState(0);
    const [pageNft, setPageNft] = useState(0);
    const [pagePoap, setPagePoap] = useState(0);
    const [pageActivity, setPageActivity] = useState(0);
    const [displayBalance, setDisplayBalance] = useState([]);
    const [displayNft, setDisplayNft] = useState([]);
    const [displayPoap, setDisplayPoap] = useState([]);
    const [displayActivity, setDisplayActivity] = useState([]);

    // Observer for Balance display
    useEffect(() => {
        const target = observeBalanceRef?.current;
        if(!(path === "" || path === address)) return;
        if(!target) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        let handleObserver = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setPageBalance(prev => {
                        const newPage = prev + 1;
                        if(newPage * page_limit < stateBalance.data.length) {
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
    }, [stateBalance, path, address]);

    useEffect(() => {
        if(stateBalance.data.length === 0) return;
        const slice = stateBalance.data.slice(pageBalance * page_limit, page_limit * (pageBalance + 1));
        setDisplayBalance(prev => {
            return [...prev, ...slice];
        });
    }, [pageBalance, stateBalance]);

    // Observer for NFTs display
    useEffect(() => {
        const target = observeNftRef?.current;
        if(!(path === "nft")) return;
        if(!target) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        let handleObserver = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setPageNft(prev => {
                        const newPage = prev + 1;
                        if(newPage * page_limit < stateNft.data.length) {
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
    }, [stateNft, path]);

    useEffect(() => {
        if(stateNft.data.length === 0) return;
        const slice = stateNft.data.slice(pageNft * page_limit, page_limit * (pageNft + 1));
        setDisplayNft(prev => {
            return [...prev, ...slice];
        });
    }, [pageNft, stateNft]);

    // Observer for POAPs display
    useEffect(() => {
        const target = observePoapRef?.current;
        if(!(path === "poap")) return;
        if(!target) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        let handleObserver = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setPagePoap(prev => {
                        const newPage = prev + 1;
                        if(newPage * page_limit < statePoap.data.length) {
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
    }, [statePoap, path]);

    useEffect(() => {
        if(statePoap.data.length === 0) return;
        const slice = statePoap.data.slice(pagePoap * page_limit, page_limit * (pagePoap + 1));
        setDisplayPoap(prev => {
            return [...prev, ...slice];
        });
    }, [pagePoap, statePoap]);

    // Observer for Activity display
    useEffect(() => {
        const target = observeActivityRef?.current;
        if(!(path === "activity")) return;
        if(!target) return;

        const options = {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        }

        let handleObserver = (entries, observer) => {
            entries.forEach(entry => {
                if(entry.isIntersecting) {
                    setPageActivity(prev => {
                        const newPage = prev + 1;
                        if(newPage * page_limit < stateActivity.data.length) {
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
    }, [stateActivity, path]);

    useEffect(() => {
        if(stateActivity.data.length === 0) return;
        const slice = stateActivity.data.slice(pageActivity * page_limit, page_limit * (pageActivity + 1));
        setDisplayActivity(prev => {
            return [...prev, ...slice];
        });
    }, [pageActivity, stateActivity]);

    return (
        <div className="profile-tabs">
            <div className="profile-tabs__links">
                {
                    PROFILE_PATHS.map((elem, ind) => (
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
                (path === "" || path === address) && 
                <div>
                    {
                        stateBalance.loading &&
                        <Loading />
                    }
                    {
                        stateBalance.error &&
                        <ErrorMsg message={stateBalance.error} />
                    }
                    {
                        displayBalance?.length > 0 &&
                        displayBalance.map((elem, ind) => (
                            <AssetCard
                                key={ind}
                                balance={elem.balance}
                                contract_address={elem.contract_address}
                                currency={elem.currency}
                                logo={elem.logo}
                                name={elem.name}
                                quote={elem.quote}
                                quote_rate={elem.quote_rate}
                                symbol={elem.symbol}
                            />
                        ))
                    }
                    {
                        !stateBalance.loading && !stateBalance.error && stateBalance.data?.length === 0 &&
                        <div className="profile-tabs__message">No assets to display.</div>
                    }
                </div>
            }
            {
                path === "nft" && 
                <div>
                    {
                        stateNft.loading &&
                        <Loading />
                    }
                    {
                        stateNft.error &&
                        <ErrorMsg message={stateNft.error} />
                    }
                    {
                        displayNft?.length > 0 &&
                        displayNft.map((elem, ind) => (
                            <NftCard
                                key={ind}
                                title={elem.title}
                                description={elem.description}
                                image={elem.image}
                                token_id={elem.token_id}
                                token_address={elem.token_address}
                                date={elem.date}
                            />
                        ))
                    }
                    {
                        !stateNft.loading && !stateNft.error && stateNft.data?.length === 0 &&
                        <div className="profile-tabs__message">No NFTs to display.</div>
                    }
                </div>
            }
            {
                path === "poap" && 
                <div>
                    {
                        statePoap.loading &&
                        <Loading />
                    }
                    {
                        statePoap.error &&
                        <ErrorMsg message={statePoap.error} />
                    }
                    {
                        displayPoap?.length > 0 &&
                        displayPoap.map((elem, ind) => (
                            <PoapCard
                                key={ind}
                                name={elem.name}
                                created={elem.created}
                                description={elem.description}
                                image_url={elem.image_url}
                                token_id={elem.token_id}
                            />
                        ))
                    }
                    {
                        !statePoap.loading && !statePoap.error && statePoap.data?.length === 0 &&
                        <div className="profile-tabs__message">No POAPs to display.</div>
                    }
                </div>
            }
            {
                path === "activity" && 
                <div>
                    {
                        stateActivity.loading &&
                        <Loading />
                    }
                    {
                        stateActivity.error &&
                        <ErrorMsg message={stateActivity.error} />
                    }
                    {
                        displayActivity?.length > 0 &&
                        displayActivity.map((elem, ind) => (
                            <ActivityCard
                                key={ind}
                                tx_hash={elem.tx_hash}
                                tx_type={elem.tx_type}
                                time={elem.time}
                                type={elem.type}
                                token_id={elem.token_id}
                                sender={elem.sender}
                                receiver={elem.receiver}
                                logo={elem.logo}
                                name={elem.name}
                                value={elem.value}
                                symbol={elem.symbol}
                            />
                        ))
                    }
                    {
                        !stateActivity.loading && !stateActivity.error && stateActivity.data?.length === 0 &&
                        <div className="profile-tabs__message">No activity to display.</div>
                    }
                </div>
            }
            <div ref={observeBalanceRef} className="observer"></div>
            <div ref={observeNftRef} className="observer"></div>
            <div ref={observePoapRef} className="observer"></div>
            <div ref={observeActivityRef} className="observer"></div>
        </div>
    );
}
