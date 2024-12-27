'use client';

import React, { useState } from 'react';

const ChatComponent = () => {
  const [messages, setMessages] = useState<{ role: string; content: string }[]>([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const hfApiKey = process.env.NEXT_PUBLIC_API_KEY; // Retrieve API key from environment variable

  if (!hfApiKey) {
    console.error('Missing Hugging Face API Key. Please set NEXT_PUBLIC_HF_API_KEY in your .env file.');
    return <div>Please configure your API key to use this feature.</div>;
  }

  const handleSend = async () => {
    if (!inputText.trim()) return;

    const userMessage = { role: 'user', content: inputText };
    setMessages((prev) => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      const response = await fetch('https://api-inference.huggingface.co/v1/chat/completions', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${hfApiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'mistralai/Mistral-Nemo-Instruct-2407',
          messages: [...messages, userMessage],
          max_tokens: 500,
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = data.choices[0].message;
      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error fetching response:', error);
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', content: 'Sorry, something went wrong. Please try again.' },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className=" text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-3xl bg-gradient-to-b from-teal-950 via-gray-950 to-black border border-gray-500 p-6 rounded-lg shadow-lg flex flex-col space-y-6">
        {/* Chat Header */}
        <div className="text-center text-lg font-semibold text-teal-400">
          Chat with AI
        </div>

        {/* Chat Messages */}
        <div className="flex flex-col space-y-4 overflow-y-auto max-h-[500px] px-2 py-4 bg-gray-900 rounded-lg shadow-inner">
          {messages.length === 0 && (
            <p className="text-gray-400 text-center italic">
              No messages yet. Start the conversation!
            </p>
          )}
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`max-w-[80%] p-3 rounded-lg text-sm ${
                msg.role === 'user'
                  ? 'bg-teal-600 self-end text-white'
                  : 'bg-gray-700 self-start text-gray-200'
              }`}
            >
              {msg.content}
            </div>
          ))}
          {isLoading && (
            <div className="self-start max-w-[80%] p-3 rounded-lg bg-gray-700 text-gray-200 text-sm italic">
              Assistant is typing...
            </div>
          )}
        </div>

        {/* Input Field */}
        <div className="flex items-center space-x-3">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            className="flex-grow p-3 rounded-lg bg-gray-900 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500"
            placeholder="Type your message here..."
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="px-4 py-2 rounded-lg bg-teal-600 hover:bg-teal-500 disabled:bg-teal-800 transition-colors font-semibold"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
