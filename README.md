# MediaGenix

MediaGenix is a fun, experimental web application built using Next.js and some APIs from Hugging Face. It offers a variety of media-related functionalities like audio transcription, image captioning, video-to-text generation, chatbot interaction, and more. This is a simple project made for learning and experimentation, not a production-grade application.

## Features

- **Home**: Welcome to MediaGenix.
- **Image Captioning**: Generate captions for uploaded images using Hugging Face's APIs.
- **Audio Transcription**: Convert audio files into text effortlessly.
- **Video to Text**: Extract textual content from video files.
- **Image Generator**: Create images from text prompts.
- **Chatbot**: Chat with an AI-powered bot.

## Technologies Used

- **Next.js**: For building the frontend.
- **React**: For user interface components.
- **ShadCN/UI**: For UI components like the mobile-friendly navigation sheet.
- **Hugging Face APIs**: For leveraging pre-trained models for various functionalities.
- **Tailwind CSS**: For styling.

## Installation and Setup

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/mediagenix.git
   cd mediagenix
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   - Create a `.env.local` file in the root directory.
   - Add your Hugging Face API key:
     ```env
     NEXT_PUBLIC_HUGGING_FACE_API_KEY=your_api_key_here
     ```

4. Run the development server:
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the app.

## How It Works

- The app uses various APIs from Hugging Face to perform tasks like image captioning, audio transcription, and chatbot interactions.
- It includes a responsive navbar and a mobile-friendly menu powered by ShadCN/UI.
- Routes and functionalities are dynamically handled using Next.js.

## Screenshots

(Include some screenshots of your application here.)

## Limitations

This is a fun project meant for exploration and learning. Some functionalities might not be robust or production-ready.

## Contributing

Contributions are welcome! Feel free to fork the repository, make changes, and submit a pull request.

## License

This project is open source and available under the [MIT License](LICENSE).

---

Happy exploring with MediaGenix! 🚀

