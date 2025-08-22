import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "../features/auth/pages/LoginPage";
import RegisterPage from "../features/auth/pages/RegisterPage";
import SuccessfulPage from "../features/auth/pages/SuccessfulPage";
import Layout from "../components/Layout";
import DashboardPage from "../features/dashboard/pages/DashboardPage";
import NewAnalysisPage from "../features/analysis/pages/NewAnalysisPage";
import HistoryPage from "../features/history/pages/HistoryPage";
import ProfilePage from "../features/profile/pages/ProfilePage";
import SettingsPage from "../features/settings/pages/SettingsPage";
import TermsAndConditions from "../features/legal/TermsAndConditions";
import PrivacyPolicy from "../features/legal/PrivacyPolicy";

export default function AppRoutes() {
  return (
     <Router> 
      <Routes>
        {/*Públicas*/}
        <Route path="/" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/successful" element={<SuccessfulPage />} />
        {/*Privadas*/}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/new-analysis" element={<NewAnalysisPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/profile" element={<ProfilePage/>} />
          <Route path="/settings" element={<SettingsPage/>} />
          {/*<Route path="/privacy-policy" element={<PrivacyPolicy/>} />*/}
          {/*<Route path="/terms-conditions" element={<TermsAndConditions/>} />*/}
      </Route>
      </Routes>
    </Router>
  );
}