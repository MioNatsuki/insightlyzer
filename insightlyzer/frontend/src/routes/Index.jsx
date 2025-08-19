import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "@/features/auth/pages/LoginPage";

export default function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* más rutas después */}
      </Routes>
    </Router>
  );
}