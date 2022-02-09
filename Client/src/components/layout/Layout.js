import "./Layout.css";
import Navbar from "../main/Navbar";
import Panel from "../main/Panel";

export default function Layout({ children }) {
    return (
        <div className="container">
            <div className="wrapper">
                <header>
                    <Navbar />
                </header>
                <main>
                    <div className="content">
                        { children }
                        <div className="content__column column__right">
                            <Panel />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
