"use client";

import { useState, ChangeEvent, FormEvent, useRef } from "react";

type TranscriptionResult = {
  text?: string;
  error?: string;
  [key: string]: any;
};

export default function Transcription() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<TranscriptionResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(false); // State to manage playback
  const audioRef = useRef<HTMLAudioElement | null>(null); // Ref to control the audio element

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
    setIsPlaying(false); // Reset the playback state when a new file is selected
  };

  const handleTranscription = async (e: FormEvent) => {
    e.preventDefault();

    if (!file) {
      alert("Please upload an audio file.");
      return;
    }

    const apiKey = process.env.NEXT_PUBLIC_API_KEY;
    setIsLoading(true);

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/openai/whisper-small",
        {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
          method: "POST",
          body: file,
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data: TranscriptionResult = await response.json();
      setResult(data);
    } catch (error) {
      setResult({ error: (error as Error).message });
    } finally {
      setIsLoading(false);
    }
  };

  // Toggle play/pause
  const togglePlayback = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 text-white">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gradient-to-t from-gray-950 via-teal-950 to-black p-6 rounded-lg shadow-lg border border-gray-400">
        {/* Left Section: File Upload */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
          <h1 className="text-3xl font-bold mb-4 text-teal-400">Audio Transcription</h1>
          <form onSubmit={handleTranscription} className="space-y-6">
            <label className="block">
              <span className="text-gray-300 font-medium">Upload Audio File (FLAC)</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-100 border border-gray-700 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 transition-all"
                required
              />
            </label>
            <button
              type="submit"
              className="w-full bg-teal-500 text-black py-3 px-4 rounded-lg text-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Transcribe"}
            </button>
          </form>

          {/* Show audio player or placeholder image */}
          {file ? (
            <div className="my-16 flex flex-col items-center">
              <audio controls>
                <source src={URL.createObjectURL(file)} />
              </audio>
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center">
              <img
                src="/placeholder-audio.png"
                alt="Placeholder"
                className="h-32 mb-4 opacity-70"
              />
              <p className="text-gray-500 text-sm text-center">
                No file selected. Please upload an audio file to start transcription.
              </p>
            </div>
          )}
        </div>

        {/* Right Section: Transcription Result */}
        <div className="md:w-1/2 md:pl-6 flex items-center justify-center bg-gray-900 rounded-lg p-4 border border-teal-600 shadow-lg">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <img
                src="/loading.gif"
                alt="Processing"
                className="w-40 h-auto mb-4"
              />
              <p className="text-teal-500 text-center">Processing your file...</p>
            </div>
          ) : result ? (
            result.error ? (
              <div className="bg-red-800 text-red-400 p-4 rounded-lg shadow-inner">
                <h2 className="text-lg font-semibold">Error:</h2>
                <p>{result.error}</p>
              </div>
            ) : (
              <div className="bg-gray-900 p-6 rounded-lg shadow-inner">
                <h2 className="text-2xl font-semibold text-teal-400 mb-2">Transcription Result:</h2>
                <p className="text-gray-300 leading-relaxed">{result.text}</p>
              </div>
            )
          ) : (
            <div className="text-gray-500 text-center">
              <p className="text-sm">Your transcription result will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
