// components/UploadDialog.tsx
import { useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

interface UploadDialogProps {
  isOpen: boolean;
  onClose: () => void;
  // onUpload: (video: any) => void;
}

export default function UploadDialog({
  isOpen,
  onClose,
  // onUpload,
}: UploadDialogProps) {
  const [title, setTitle] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type === "video/mp4") {
      setSelectedFile(file);
    } else {
      alert("Please select a valid MP4 file.");
      setSelectedFile(null);
    }
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (!title || !selectedFile) {
      setError("Title and video file are required.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("video_file", selectedFile);

    try {
      setIsUploading(true);
      setUploadProgress(0);
      const apiKey = process.env.NEXT_PUBLIC_API_KEY || "";
      const response = await axios.post(`${apiKey}videos/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Token ${localStorage.getItem("token") || ""}`,
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percentCompleted = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percentCompleted);
          }
        },
      });

      setUploadProgress(100);
      // onUpload(response.data.video);
      setTitle("");
      setSelectedFile(null);
      setError(null);
    } catch (err: any) {
      setError(err.response?.data?.errors || "Failed to upload video.");
      console.error("Error uploading video:", err);
    } finally {
      setIsUploading(false);
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 ${
        isOpen ? "block" : "hidden"
      }`}
    >
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-lg shadow-lg p-6 w-80"
      >
        <h2 className="text-lg font-semibold mb-4">Upload Video</h2>
        <input
          type="text"
          placeholder="Enter video title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="block w-full mb-4 p-2 border border-gray-300 rounded-lg"
          required
        />
        <input
          type="file"
          accept=".mp4"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-100 file:text-blue-700 hover:file:bg-blue-200"
          required
        />
        {isUploading && (
          <div className="mt-4 w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${uploadProgress}%` }}
            ></div>
          </div>
        )}
        <button
          type="submit"
          disabled={!selectedFile || isUploading}
          className={`mt-4 w-full ${
            isUploading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          } text-white py-2 rounded-lg transition-colors`}
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
        {error && <p className="text-red-500 mt-2 text-sm">{error}</p>}
        <button
          onClick={onClose}
          disabled={isUploading}
          className="mt-2 w-full bg-gray-200 text-gray-700 py-2 rounded-lg hover:bg-gray-300 transition-colors"
        >
          Cancel
        </button>
      </form>
    </div>
  );
}
