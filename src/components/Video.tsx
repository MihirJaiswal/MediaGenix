'use client';
import { useState } from "react";
import axios from "axios";

interface TranscriptionResponse {
  transcription: string;
}

const VideoToTextGenerator = () => {
  const [videoUrl, setVideoUrl] = useState("");
  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [transcription, setTranscription] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [isUrlInputDisabled, setIsUrlInputDisabled] = useState(false);
  const [isFileInputDisabled, setIsFileInputDisabled] = useState(false);
  const [videoUrlToEmbed, setVideoUrlToEmbed] = useState("");

  const handleTranscription = async () => {
    if (!videoUrl && !videoFile) {
      setError("Please provide a video URL or upload a video.");
      return;
    }

    setIsLoading(true);
    setError("");
    setTranscription("");

    try {
      let response;

      if (videoFile) {
        const formData = new FormData();
        formData.append("videoFile", videoFile);
        
        response = await axios.post<TranscriptionResponse>(
          "http://localhost:5000/transcribe-file", 
          formData, 
          {
            headers: { "Content-Type": "multipart/form-data" },
            timeout: 300000 // 5 minute timeout for file processing
          }
        );
      } else {
        response = await axios.post<TranscriptionResponse>(
          "http://localhost:5000/transcribe", 
          { videoUrl },
          {
            headers: { "Content-Type": "application/json" },
            timeout: 30000 // 30 second timeout for URL processing
          }
        );
      }

      if (response.data.transcription) {
        setTranscription(response.data.transcription);
      } else {
        setError("No transcription was generated. Please try again.");
      }
    } catch (err) {
      console.error("Error during transcription:", err);
      
      if (axios.isAxiosError(err)) {
        if (err.code === 'ECONNREFUSED') {
          setError("Cannot connect to the server. Please make sure the server is running.");
        } else if (err.response?.status === 404) {
          setError("The transcription service is not available. Please try again later.");
        } else if (err.response?.status === 413) {
          setError("The video file is too large. Please try a smaller file.");
        } else if (err.code === 'ECONNABORTED') {
          setError("The request timed out. Please try again with a shorter video.");
        } else {
          setError(err.response?.data?.error || "An error occurred while generating the transcription.");
        }
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleUrlChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const url = e.target.value;
    setVideoUrl(url);
    
    // Extract YouTube video ID
    const videoIdMatch = url.match(
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/|\S+[\?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
    );
    
    setVideoUrlToEmbed(videoIdMatch ? videoIdMatch[1] : "");
    setIsFileInputDisabled(!!url);
    
    // Clear any existing errors when input changes
    setError("");
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    
    if (file) {
      // Check file size (e.g., 100MB limit)
      if (file.size > 100 * 1024 * 1024) {
        setError("File size exceeds 100MB limit. Please choose a smaller file.");
        return;
      }
      
      // Check file type
      if (!file.type.startsWith('video/')) {
        setError("Please select a valid video file.");
        return;
      }
    }
    
    setVideoFile(file);
    setIsUrlInputDisabled(!!file);
    setError("");
  };

  const isYouTubeLink = (url: string): boolean => {
    return /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+|(?:v|e(?:mbed)?)\/|\S+[\?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/.test(url);
  };

  return (
    <div className="flex items-center justify-center p-6 text-white">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gradient-to-t from-gray-950 via-teal-950 to-black p-6 rounded-lg shadow-lg border border-gray-400">
        {/* Left Section: Video Input */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
          <h1 className="text-3xl font-bold mb-4 text-teal-400">Video to Text Generator</h1>
          
          <div className="space-y-4">
            {/* URL Input */}
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium mb-1">
                YouTube Video URL
              </label>
              <input
                id="videoUrl"
                type="text"
                className="border p-2 w-full bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                placeholder="Enter YouTube video URL"
                value={videoUrl}
                onChange={handleUrlChange}
                disabled={isUrlInputDisabled}
              />
            </div>

            {/* File Input */}
            <div>
              <label htmlFor="videoFile" className="block text-sm font-medium mb-1">
                Or Upload Video File (max 100MB)
              </label>
              <input
                id="videoFile"
                type="file"
                accept="video/*"
                className="border p-2 w-full bg-gray-800 text-white rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-teal-500 disabled:opacity-50"
                onChange={handleFileChange}
                disabled={isFileInputDisabled}
              />
            </div>

            {/* Generate Button */}
            <button
              onClick={handleTranscription}
              className="w-full bg-teal-500 text-black py-3 px-4 rounded-lg text-lg font-medium hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-400 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              disabled={isLoading || (!videoUrl && !videoFile)}
            >
              {isLoading ? "Transcribing..." : "Generate Transcript"}
            </button>

            {/* Error Message */}
            {error && (
              <div className="text-red-500 p-3 rounded-lg bg-red-500/10 text-sm">
                {error}
              </div>
            )}
          </div>

          {/* Video Preview */}
          <div className="mt-6">
            {videoUrlToEmbed && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${videoUrlToEmbed}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title="YouTube Video"
                  className="rounded-lg"
                />
              </div>
            )}

            {videoFile && (
              <div className="aspect-video w-full rounded-lg overflow-hidden bg-black">
                <video
                  controls
                  className="w-full h-full"
                  src={URL.createObjectURL(videoFile)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Section: Transcription */}
        <div className="md:w-1/2 h-[35rem] md:pl-6">
          <div className="h-full bg-gray-900 rounded-lg p-4 border border-teal-600 shadow-lg overflow-auto">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center h-full">
                <img
                src="/loading.gif"
                alt="Processing"
                className="w-40 h-auto mb-4"
              />
                <p className="text-teal-500">Processing your video...</p>
              </div>
            ) : transcription ? (
              <div className="space-y-4">
                <h2 className="text-2xl font-semibold text-teal-400">Transcription Result:</h2>
                <div className="prose prose-invert max-w-none">
                  <p className="text-gray-300 whitespace-pre-wrap">{transcription}</p>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-full text-gray-500 text-center">
                Enter a YouTube URL or upload a video to view the transcription result here.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoToTextGenerator;