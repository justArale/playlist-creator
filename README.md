# Playlist Creator

## Overview

The Playlist Creator is a web application built with React, utilizing the Spotify API to create custom playlists based on user preferences for danceability. Users can search for artists and define the danceability range to generate a playlist that suits their mood.

## Features

- **Artist Search**: Users can search for their favorite artists to base their playlist on.
- **Danceability Range Selection**: Users can specify a minimum and maximum danceability score to tailor the playlist to their energy level preferences.
- **Playlist Generation**: Based on the selected artist and danceability range, a playlist is generated for the user.
- **Favorite Tracks**: Users can mark tracks as favorites, which are then saved for later retrieval.
- **Related Artists**: Provides recommendations for artists related to the user's choices, enhancing music discovery.

## Installation

To set up the project locally, follow these steps:

1. Clone the repository: git clone [repository URL]
2. Install dependencies: cd [project-directory] && npm install
3. Set up environment variables:
- Create a `.env` file in the project root.
- Add `VITE_CLIENT_ID` and `VITE_CLIENT_SECRET` with your Spotify API client ID and secret.

4. Run the development server: npm start

This will run the app in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

- **Home Page**: Start by searching for an artist in the search box.
- **Set Danceability**: Adjust the danceability range using the slider.
- **Generate Playlist**: Click the "Create Playlist" button to generate your playlist based on the selected criteria.
- **Favorite Songs**: Click the heart icon next to each song to save it as a favorite.

## Components

- `SearchArtist`: Component for searching and selecting artists.
- `RangeButton`: Component to select the danceability range.
- `LoadResults`: Component that handles the API calls to Spotify and displays the generated playlist along with options to save favorite tracks.

## Dependencies

- **React**: For building the user interface.
- **Axios**: Used for making HTTP requests to the Spotify API.
- **React Router**: For handling routing within the application.
- **Toastify**: For displaying notifications.

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your enhancements. Make sure to follow the existing coding style and include comments where necessary.

For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License - see the `LICENSE` file for details.

