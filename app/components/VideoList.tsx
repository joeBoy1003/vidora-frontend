"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import { Grid, CircularProgress, Typography, Box } from "@mui/material";
import VideoCard from "./VideoCard";
import VideoUploadForm from "./VideoUploadForm";
import { Video } from "../_lib/types";
import axiosInstance from "../_lib/utils/axiosConfig";

const VideoList: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchVideos = async () => {
    try {
      const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
      const response = await axiosInstance.get(`${apiKey}videos/getAll`);
      setVideos(response.data);
    } catch (error) {
      console.error("Error fetching videos:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchVideos();
  }, []);

  // Handle the deletion of a video
  const handleDelete = (id: number) => {
    setVideos((prevVideos) => prevVideos.filter((video) => video.id !== id));
  };

  // Handle the addition of a new video
  const handleUpload = (video: Video) => {
    setVideos((prevVideos) => [video, ...prevVideos]);
    console.log("handleUpload:", videos, video);
  };

  if (loading) {
    return (
      <Grid container justifyContent="center" sx={{ mt: 4 }}>
        <CircularProgress />
      </Grid>
    );
  }

  return (
    <Box sx={{ padding: 2 }}>
      <VideoUploadForm onUpload={handleUpload} />
      {videos.length === 0 ? (
        <Typography variant="h6" align="center" sx={{ mt: 4 }}>
          No videos available.
        </Typography>
      ) : (
        <Grid container spacing={3} sx={{ mt: 2 }}>
          {videos.map((video) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={video.id}>
              <VideoCard video={video} onDelete={handleDelete} />
            </Grid>
          ))}
        </Grid>
      )}
    </Box>
  );
};

export default VideoList;
