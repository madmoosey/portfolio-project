import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./hooks/useAuth";
import MediaGallery from "./components/MediaGallery";
import LoginPrompt from "./components/LoginPrompt";
import Loader from "./components/Loader";
import Title from "./components/Title";
import LoginPage from "./pages/LoginPage";
import Navbar from "./components/Navbar"; 

export default function App() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) return <Loader message="Checking your login status..." />;

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar /> 

      <div className="flex-grow flex flex-col items-center justify-center pt-20">
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
    </div>
  );
}