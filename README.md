# YouTube Data Processing API

This API allows users to fetch details of YouTube videos and their comments using the YouTube Data API. It provides endpoints to retrieve video information and comments, along with features like rate limiting and pagination.

## Features

- Fetch video details including title, description, view count, and like count.
- Load comments for a specific video, handling pagination automatically.
- Rate limiting to manage API request loads.
- Error handling to ensure user-friendly responses.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/harmydiano/youtube-api.git
   ```

2. **Navigate to the project directory:**

   ```bash
   cd youtube-api
   ```

3. **Install the dependencies:**

   ```bash
   npm install
   ```

4. **Create a `.env` file** in the root directory and add your YouTube API key:

   ```
   YOUTUBE_API_KEY=your_api_key_here
   YOUTUBE_API_URL=https://www.googleapis.com/youtube/v3
   ```

5. **Start the application:**

   ```bash
   npm start
   ```

## API Documentation

<https://documenter.getpostman.com/view/4900546/2sAY4uCNmr>

## UI URL

<https://service-api-456570975d23.herokuapp.com/>
