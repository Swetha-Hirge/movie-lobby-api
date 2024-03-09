# Movie Lobby API

## Description

Movie Lobby API is a RESTful API for managing movies. It allows users to perform CRUD operations on movies, search for movies by title or genre, and more.

## Installation

1. **Clone the repository:**
   
   ```bash
   git clone <repository-url>

2. **Install dependencies:**
   
   ```bash
   cd movie-lobby-api
   npm install
   
3. **Run project:**
   ```bash
   npm run start
   
## CURLs for project

1. **To add a new movie:**
   ```bash
   curl --location 'http://localhost:5000/api/movies' \ --header 'Content-Type: application/json' \ --data '{ "title": "Updated Movie Title", "genre": "Updated Genre", "rating": 9.5, "streamingLink": "https://www.example.com/updated_link" }'


3. **To get all movies:**
   ```bash
   curl --location 'http://localhost:5000/api/movies'
   
4. **To search for movies:**
   ```bash
   curl --location 'http://localhost:5000/api/search?q=Godfather'

5. **To update a movie:**
    ```bash
    curl --location --request PUT 'http://localhost:5000/api/movies/65ebea6822341622934a68c1' \ --header 'Content-Type: application/json' \ --data '{ "title": "Updated Movie Title", "genre": "Updated Genre", "rating": 9.5, "streamingLink": "https://www.example.com/updated_link" }'


5. **To delete a movie:**
    ```bash
    curl --location --request DELETE 'http://localhost:5000/api/movie/65ebf44e508ff4f681742c4f'
 
