'use client';
import React, { useState } from 'react';

// Function to query Hugging Face API
async function query(data: { inputs: string }): Promise<Blob> {
  const response = await fetch(
    "https://api-inference.huggingface.co/models/Datou1111/shou_xin",
    {
      headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_KEY}`, // Access the token from the .env file
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(data),
    }
  );
  
  if (!response.ok) {
    throw new Error("Error fetching the image.");
  }

  return response.blob(); // Return the image Blob
}

const ImageGenerator: React.FC = () => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [textInput, setTextInput] = useState<string>('');

  // Handle text input change
  const handleTextChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTextInput(event.target.value);
  };

  // Handle image generation
  const handleGenerateImage = async () => {
    if (!textInput.trim()) {
      setError("Please enter some text.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const response = await query({ inputs: textInput });
      const imageObjectURL = URL.createObjectURL(response); // Convert blob to URL
      setImageUrl(imageObjectURL);
    } catch (err) {
      setError("Error fetching image.");
    } finally {
      setLoading(false);
    }
  };

  // Handle image download
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = 'generated-image.png'; // Set the download file name
      link.click();
    }
  };

  return (
    <div className="flex items-center justify-center p-6 text-white ">
      <div className="flex flex-col md:flex-row max-w-5xl w-full bg-gradient-to-t from-teal-950 via-blue-950 to-gray-900 p-6 rounded-lg shadow-lg border border-gray-400">
        {/* Left Section: Input for text description */}
        <div className="md:w-1/2 mb-6 md:mb-0 md:pr-6">
          <h1 className="text-3xl font-bold mb-4 text-teal-400">AI Image Generator</h1>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="space-y-6"
          >
            <label className="block">
              <span className="text-gray-300 font-medium">Enter Description (e.g., "Astronaut riding a horse")</span>
              <input
                type="text"
                value={textInput}
                onChange={handleTextChange}
                placeholder="Enter description"
                className="mt-2 block w-full text-sm text-gray-100 border border-gray-700 rounded-lg shadow-sm focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50 p-2 bg-gray-800 hover:bg-gray-700 transition-all"
                required
              />
            </label>
            <button
              type="button"
              onClick={handleGenerateImage}
              className="w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-black py-3 px-4 rounded-lg text-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Image"}
            </button>
          </form>
        </div>

        {/* Right Section: Display generated image or error */}
        <div className="md:w-1/2 md:pl-6 flex items-center justify-center bg-gray-900 rounded-lg p-4 border border-teal-600 shadow-lg">
          {loading ? (
            <div className="flex flex-col items-center">
              <img
                src="/loading.gif"
                alt="Processing"
                className="w-40 h-auto mb-4"
              />
              <p className="text-teal-500 text-center">Processing your image...</p>
            </div>
          ) : error ? (
            <div className="bg-red-800 text-red-400 p-4 rounded-lg shadow-inner">
              <h2 className="text-lg font-semibold">Error:</h2>
              <p>{error}</p>
            </div>
          ) : (
            <div className="mt-6">
              {imageUrl && (
                <div>
                  <img
                    src={imageUrl}
                    alt="Generated"
                    className="max-w-full rounded-lg"
                  />
                  {/* Download Button */}
                  <button
                    onClick={handleDownload}
                    className="mt-4 w-full bg-gradient-to-r from-teal-500 to-blue-500 hover:from-teal-600 hover:to-blue-600 text-black py-3 px-4 rounded-lg text-lg font-medium hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-400 transition-all"
                  >
                    Download Image
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImageGenerator;
