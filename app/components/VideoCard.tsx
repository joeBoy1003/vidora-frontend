"use client";

import React from "react";
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import { Video } from "../_lib/types";

interface VideoCardProps {
  video: Video;
  onDelete: (id: number) => void;
}

const VideoCard: React.FC<VideoCardProps> = ({ video, onDelete }) => {
  const handleDelete = async () => {
    try {
      const apiKey: string = process.env.NEXT_PUBLIC_API_KEY || "";
      await axios.delete(`${apiKey}videos/${video.id}/delete`, {
        method: "DELETE",
        Authorization: `Token ${localStorage.getItem("token")}`,
      });
      onDelete(video.id); // Update the UI in VideoList
    } catch (error) {
      console.error("Error deleting video:", error);
    }
  };
  // Ensure no double slashes in the URL
  const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
  const videoSrc = `${apiKey}${video.video_file.startsWith("/") ? video.video_file.substring(1) : video.video_file}`;
  return (
    <Card>
      <CardContent>
        <Typography gutterBottom variant="h6" component="div">
          {video.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Posted on {new Date(video.uploaded_at).toLocaleDateString()}
        </Typography>
      </CardContent>
      <CardActions>
        <IconButton aria-label="delete" color="error" onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};

export default VideoCard;
