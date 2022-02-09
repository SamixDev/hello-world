import React, { useState, useEffect, useContext } from "react";
import { getSocialData } from "../api";
import { AuthContext } from "./AuthContext";
import { isAbortError } from "../helpers/functions";

export const DataContext = React.createContext();
DataContext.displayName = "DataProvider";

export default function DataProvider({ children }) {
    const authContext = useContext(AuthContext);
    const account = authContext.account;
    const [stateFeaturedData, setStateFeaturedData] = useState({
        data: [],
        loading: true,
        error: ""
    });
    const [recommendedData, setRecommendedData] = useState([]);

    // ~~~ Fetching Social data - Recommended ~~~
    useEffect(() => {
        if(!account) return;
        setRecommendedData([]);

        const query = getSocialData(account, "recommendations");
        query
            .then(res => {
                setRecommendedData(res.recommendations);
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
    }, [account]);

    // ~~~ Fetching Social data - Featured ~~~
    useEffect(() => {
        if(!account) return;
        setStateFeaturedData({
            data: [],
            loading: true,
            error: ""
        });

        const query = getSocialData(account, "featured");
        query
            .then(res => {
                setStateFeaturedData({
                    data: res.featured,
                    loading: false,
                    error: ""
                });
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                    setStateFeaturedData({
                        data: [],
                        loading: true,
                        error: ""
                    });
                } else {
                    console.error(err.message);
                    setStateFeaturedData({
                        data: [],
                        loading: false,
                        error: err.message
                    });
                }
            });
        return () => {
            query.cancel();
        }
    }, [account]);

    return (
        <DataContext.Provider
            value={{
                recommendedData: recommendedData,
                stateFeaturedData: stateFeaturedData
            }}
        >
            {children}
        </DataContext.Provider>
    );
}
