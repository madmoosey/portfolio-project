import React, { useEffect, useState } from "react";
import Carousel from "./Carousel";
import Loader from "./Loader";
import { API_BASE_URL } from "../config";

export default function MediaGallery() {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchMedia() {
      try {
        // Retrieve the JWT token (stored after login)
        const token = localStorage.getItem("access");

        if (!token) {
          console.error("No JWT token found. User may not be logged in.");
          setLoading(false);
          return;
        }

        const res = await fetch(`${API_BASE_URL}/api/media/`, {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) throw new Error("Failed to fetch media");
        const data = await res.json();
        setMedia(data);
      } catch (err) {
        console.error("Error fetching media:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMedia();
  }, []);

  if (loading) return <Loader message="Loading your media..." />;
  if (media.length === 0)
    return (
      <p className="text-gray-400 text-center mt-8">No media available.</p>
    );

  return <Carousel media={media} />;
}