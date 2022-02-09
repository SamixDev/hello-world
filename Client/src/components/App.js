import "./App.css";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import AuthProvider from "../context/AuthContext";
import DataProvider from "../context/DataContext";
import ProfileProvider from "../context/ProfileContext";
import LandingPage from "./pages/LandingPage";
import ExplorePage from "./pages/ExplorePage";
import ProfilePage from "./pages/ProfilePage";
import SocialPage from "./pages/SocialPage";
import ProfileTabs from "./tabs/ProfileTabs";
import SocialTabs from "./tabs/SocialTabs";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <DataProvider>
                    <ProfileProvider>
                        <Routes>
                            <Route path="/" element={<LandingPage />} />
                            <Route path="/explore" element={<ExplorePage />} />
                            <Route path=":user/*" element={<ProfilePage />}>
                                <Route index element={<ProfileTabs />} />
                                <Route path="nft" element={<ProfileTabs />} />
                                <Route path="poap" element={<ProfileTabs />} />
                                <Route path="activity" element={<ProfileTabs />} />
                            </Route>
                            <Route path=":user/*" element={<SocialPage />}>
                                <Route path="followers" element={<SocialTabs />} />
                                <Route path="following" element={<SocialTabs />} />
                                <Route path="interests" element={<SocialTabs />} />
                            </Route>
                        </Routes>
                    </ProfileProvider>
                </DataProvider>
            </AuthProvider>
        </BrowserRouter>
    );
}

export default App;
