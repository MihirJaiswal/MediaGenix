"use client";
import React, { useState, ChangeEvent, FormEvent } from "react";

type CaptioningResult = {
  caption?: string;
  error?: string;
  [key: string]: any;
};

export default function ImageCaptioningComponent() {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [caption, setCaption] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const API_URL = "https://api-inference.huggingface.co/models/Salesforce/blip-image-captioning-large";
  const API_KEY = process.env.NEXT_PUBLIC_API_KEY; 

  // Handle file selection and convert to base64
  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setImageFile(file);
      convertToBase64(file);
    }
  };

  // Convert image file to base64 string
  const convertToBase64 = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (reader.result) {
        const base64String = reader.result.toString().split(",")[1]; // Remove the data URL prefix
        handleCaptioning(base64String);
      }
    };
    reader.readAsDataURL(file);
  };

  // Handle image captioning by calling Hugging Face API
  const handleCaptioning = async (base64Image: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: base64Image, // Pass only the base64 string without the prefix
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`API Error: ${errorData.error}`);
        return;
      }

      const data = await response.json();
      setCaption(data[0]?.generated_text || "No caption available");
      setError(null);
    } catch (err) {
      console.error("Error:", err);
      setError("An error occurred while fetching the caption.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center p-6 text-white">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gradient-to-b from-teal-950 via-blue-950 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-400">
        {/* Left Section: File Upload */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
          <h1 className="text-3xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-blue-500">Image Captioning</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <label className="block">
              <span className="text-gray-300 font-medium">Upload Image File (JPG, PNG)</span>
              <input
                type="file"
                onChange={handleFileChange}
                className="mt-2 block w-full text-sm text-gray-100 border border-gray-700 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 cursor-pointer p-2 bg-gray-800 hover:bg-gray-700 transition-all"
                required
              />
            </label>
            <button
              type="button"
              onClick={() => imageFile && convertToBase64(imageFile)}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-black py-3 px-4 rounded-lg text-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              disabled={isLoading}
            >
              {isLoading ? "Processing..." : "Generate Caption"}
            </button>
          </form>
          <div className="mt-6 flex flex-col items-center">
            <img
              src={imageFile ? URL.createObjectURL(imageFile) : "/placeholder.webp"}
              alt="Uploaded preview"
              className="h-32 mb-4 opacity-70"
            />
            <p className="text-gray-500 text-sm text-center">
              {!imageFile ? "No file selected. Please upload an image file to start captioning." : ""}
            </p>
          </div>
        </div>

        {/* Right Section: Captioning Result */}
        <div className="md:w-1/2 md:pl-6 flex items-center justify-center bg-gray-900 rounded-lg p-4 border border-teal-600 shadow-lg">
          {isLoading ? (
            <div className="flex flex-col items-center">
              <img
                src="/loading.gif"
                alt="Processing"
                className="w-40 h-auto mb-4"
              />
              <p className="text-teal-500 text-center">Processing your image...</p>
            </div>
          ) : caption || error ? (
            <div className="bg-gray-900 p-6 rounded-lg shadow-inner">
              {error && (
                <div className="bg-red-800 text-red-400 p-4 rounded-lg shadow-inner">
                  <h2 className="text-lg font-semibold">Error:</h2>
                  <p>{error}</p>
                </div>
              )}
              {caption && (
                <div>
                  <h2 className="text-2xl font-semibold text-teal-400 mb-2">Generated Caption:</h2>
                  <p className="text-gray-300 leading-relaxed">{caption}</p>
                </div>
              )}
            </div>
          ) : (
            <div className="text-gray-500 text-center">
              <p className="text-sm">Your caption will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
