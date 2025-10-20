import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MediaGallery from "./components/MediaGallery";
import LoginPrompt from "./components/LoginPrompt";
import Loader from "./components/Loader";
import Title from "./components/Title";
import LoginPage from "./pages/LoginPage";

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader message="Checking your login status..." />;

  return (
    <Router>
      <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Title text="gallerie" />
                {isAuthenticated ? <MediaGallery /> : <LoginPrompt />}
              </>
            }
          />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </div>
    </Router>
  );
}