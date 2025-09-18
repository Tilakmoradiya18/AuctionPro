import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import HomePage from "./pages/HomePage"; 
import HomePageLoggedIn from "./pages/HomePageLoggedIn";
import SetProfilePage from "./pages/setProfilePage";
import ViewProfilePage from "./pages/ViewProfilePage";
import UpdateProfilePage from "./pages/UpdateProfilePage";
import CreateAuctionPage from "./pages/CreateAuctionPage";
import BidPage from "./pages/BidPage";
import ActivityPage from "./pages/activityPage";
import ItemPage from "./pages/itemPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/homeLoggedIn" element={<HomePageLoggedIn/>}/>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        <Route path="/reset-password" element={<ResetPasswordPage />} />
        <Route path="/set-profile" element={<SetProfilePage/>}/>
        <Route path="/view-profile" element={<ViewProfilePage />} />
        <Route path="/update-profile" element={<UpdateProfilePage />} />
        <Route path="/create-auction" element={<CreateAuctionPage />} />
        <Route path="/auction/:id" element={<BidPage />} />
        <Route path="/my-activity" element={<ActivityPage />} />
        <Route path="/my-items" element={<ItemPage />} />
      </Routes>
    </BrowserRouter>  
  );
}

export default App;


