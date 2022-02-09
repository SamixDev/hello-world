import "./LandingPage.css";
import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import { LOGIN_OPTIONS } from "../../helpers/constants";
import LoginBtn from "../buttons/LoginBtn";

export default function LandingPage() {
    const authContext = useContext(AuthContext);
    const account = authContext.account;

    if(account) {
        return <Navigate to={`/${account}/`}/>
    }

    return (
        <main>
            <div className="landing">
                <div className="landing__left"></div>
                <div className="landing__right">
                    <div className="landing__right__login">
                        <h1>Hello World</h1>
                        <h2>Discover your network.</h2>
                        {
                            LOGIN_OPTIONS.map((elem, ind) => (
                                <LoginBtn
                                    key={ind}
                                    value={elem.value}
                                    label={elem.label}
                                    handleLogin={authContext.handleLogin}
                                />
                            ))
                        }
                    </div>
                </div>
            </div>
        </main>
    );
}
