import { useState, useEffect } from "react";
import "./Search.css";
import { Navigate } from "react-router-dom";
import { resolveAddressByInput } from "../../api";
import { FiSearch } from "react-icons/fi";
import { BiError } from "react-icons/bi";
import { isAbortError } from "../../helpers/functions";
import Loading from "./Loading";

export default function Search() {
    const [input, setInput] = useState("");
    const [key, setKey] = useState("");
    const [stateAddress, setStateAddress] = useState({
        loading: false,
        address: "",
        error: ""
    });

    useEffect(() => {
        if(key !== "Enter") return;
        setStateAddress({
            loading: true,
            address: "",
            error: ""
        });

        const query = resolveAddressByInput(input);
        query
            .then(res => {
                setStateAddress({
                    loading: false,
                    address: res.address,
                    error: ""
                });
            })
            .catch(err => {
                if(isAbortError(err)) {
                    console.log("The user aborted a request.");
                } else {
                    console.error(err.message);
                    setStateAddress({
                        loading: false,
                        address: "",
                        error: "Incorrect address/domain."
                    });
                }
            });

        return () => {
            query.cancel();
        }
    }, [key, input]);

    const handleOnChange = e => {
        setInput(e.currentTarget.value);
    }

    const handleOnKeyDown = e => {
        setKey("");
        setKey(e.key);
    }

    if(stateAddress.address) return (
        <Navigate to={`/${stateAddress.address}/`}/>
    )

    return (
        <div className="search-wrapper">
            <div className="search">
                {
                    stateAddress.loading &&
                    <Loading />
                }
                {
                    !stateAddress.loading &&
                    <FiSearch />
                }
                <input
                    value={input}
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Search by address or domain"
                    onKeyDown={handleOnKeyDown}
                ></input>
            </div>
            {
                stateAddress.error &&
                <div className="search__error">
                    <BiError />
                    <div>{stateAddress.error}</div>
                </div>
            }
        </div>
    );
}
