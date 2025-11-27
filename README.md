# 🎬 CineSearch - Movie Search Application

A full-featured movie search application built with React that integrates with the OMDB API. Users can search for movies, view detailed information, filter by type, and manage a personal list of favorite movies.

## ✨ Features

- **Movie Search**: Search for movies, TV series, and episodes using keywords
- **Type Filtering**: Filter results by movie type (Movies, TV Series, Episodes)
- **Pagination**: Navigate through large sets of search results with easy-to-use pagination controls
- **Detailed Movie View**: Access comprehensive movie information including:
  - Poster image
  - Title and release year
  - Genre
  - Plot summary
  - Cast and crew
  - IMDb rating and votes
  - Box office information
  - Director and writer details
- **Favorites Management**: Add/remove movies from your personal favorites list (stored in localStorage)
- **Responsive Design**: Fully responsive UI that works on mobile, tablet, and desktop devices
- **Error Handling**: User-friendly error messages for API failures and edge cases
- **Loading States**: Visual feedback during data fetching

## 🛠️ Tech Stack

- **Frontend Framework**: React 18
- **Routing**: React Router v6
- **Styling**: Tailwind CSS
- **HTTP Client**: Axios
- **Build Tool**: Vite
- **API**: OMDB API (https://www.omdbapi.com/)

## 📋 Project Structure

```
src/
├── components/           # Reusable React components
│   ├── SearchBar.jsx      # Search input component
│   ├── FilterDropdown.jsx # Movie type filter
│   ├── MovieCard.jsx      # Individual movie card
│   ├── MovieGrid.jsx      # Grid layout for movies
│   ├── Pagination.jsx     # Pagination controls
│   └── Header.jsx         # Application header
├── pages/                # Page components
│   ├── SearchPage.jsx     # Main search page
│   ├── MovieDetailsPage.jsx # Movie details view
│   └── FavoritesPage.jsx  # Favorites list view
├── services/            # API service functions
│   └── omdbService.js    # OMDB API integration
├── context/             # React Context for state management
│   └── FavoritesContext.jsx # Favorites state management
├── App.jsx              # Main App component with routing
├── main.jsx             # React entry point
└── index.css            # Global styles with Tailwind
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd movies-searching-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Get a free OMDB API Key**
   - Visit [OMDB API](https://www.omdbapi.com/)
   - Register for a free API key (limited to 1000 requests/day)
   - The API key is already included in the code: `9fb8b4e7`

### Development

Run the development server:

```bash
npm run dev
```

The application will open at `http://localhost:5173` (or another port if 5173 is in use).

### Building for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 📖 How to Use

1. **Search for Movies**
   - Enter a movie title or keyword in the search bar
   - Click "Search" or press Enter
   - Results will load in a grid format

2. **Filter by Type**
   - Use the filter dropdown to filter results by type:
     - All Types
     - Movies
     - TV Series
     - Episodes
   - Filter is only available after performing a search

3. **View Movie Details**
   - Click on any movie card to view detailed information
   - View poster, ratings, plot, cast, and more
   - Add/remove from favorites using the heart button

4. **Manage Favorites**
   - Click the heart icon on any movie card to add to favorites
   - View all favorites from the "Favorites" page
   - Favorites are saved to your browser's localStorage

5. **Navigate Pages**
   - Use pagination controls to browse through search results
   - Each page displays 10 results

## 🌐 Deployment on Netlify

### Steps to Deploy:

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Sign up on Netlify**
   - Go to [Netlify](https://www.netlify.com)
   - Sign up with GitHub, GitLab, or Bitbucket

3. **Connect GitHub Repository**
   - Click "New site from Git"
   - Choose your Git provider and select the repository
   - Set build command: `npm run build`
   - Set publish directory: `dist`

4. **Deploy**
   - Click "Deploy"
   - Your site will be live at a Netlify URL

### Environment Variables (if needed)
Create a `.env` file in the root directory:
```
VITE_OMDB_API_KEY=9fb8b4e7
```

## 📝 API Information

### OMDB API Endpoints Used

1. **Search Movies**
   ```
   GET https://www.omdbapi.com/?apikey=API_KEY&s=SEARCH_TERM&page=PAGE&type=TYPE
   ```

2. **Get Movie Details**
   ```
   GET https://www.omdbapi.com/?apikey=API_KEY&i=IMDB_ID&plot=full
   ```

### API Limitations
- Free tier: 1000 requests/day
- Results are paginated with 10 items per page
- Some older movies may not have all information

## 🎨 Customization

### Theme Colors

Edit `tailwind.config.js` to change colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: '#1a1a2e',      // Dark background
      secondary: '#16213e',     // Secondary background
      accent: '#e94560',        // Red accent
    },
  },
},
```

### Styling

Global styles are in `src/index.css`. Tailwind utility classes are used throughout components for easy customization.

## ⚠️ Error Handling

The application handles various error scenarios:

- **No internet connection**: Displays error message
- **API errors**: User-friendly error messages
- **Invalid API key**: Error notification
- **No results found**: Helpful message suggesting alternative searches
- **Movie not found**: Error page with back button

## 🔐 Security Notes

- API key is public (used for demo purposes)
- For production, use environment variables
- Always validate API responses on the server side
- Implement rate limiting if needed

## 🐛 Known Limitations

- Free OMDB API has 1000 requests/day limit
- Some movies may lack detailed information
- Poster images may not load if external URLs are unavailable
- Pagination limited to 100 pages (1000 results)

## 📦 Dependencies

- `react@^18.2.0` - UI library
- `react-dom@^18.2.0` - React DOM rendering
- `react-router-dom@^6.20.0` - Routing library
- `axios@^1.6.2` - HTTP client
- `tailwindcss@^3.3.6` - CSS framework
- `vite@^5.0.8` - Build tool

## 🙏 Acknowledgments

- [OMDB API](https://www.omdbapi.com/) for movie data
- [React](https://react.dev/) for the framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Vite](https://vitejs.dev/) for fast build tooling

## 📄 License

This project is open source and available under the MIT License.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📧 Contact

For questions or suggestions, please open an issue on the GitHub repository.

---

**Happy Searching! 🎬🍿**
