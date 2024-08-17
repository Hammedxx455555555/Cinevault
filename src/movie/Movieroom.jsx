/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Movieroom = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  const getData = () => {
    axios
      .get(
        'https://api.themoviedb.org/3/discover/movie?api_key=f9503bddc3df2a3c6c89e437e79c9a87'
      )
      .then((response) => {
        setMovies(response.data.results);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  const imageBaseUrl = `https://image.tmdb.org/t/p/original`;

  const filteredMovies = movies.filter((movie) =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="app">
        <div className="header text-center my-8">
          <h1 className="text-4xl font-bold  mb-4">Cinevault!</h1>
          <input
            type="text"
            placeholder="Search for movies"
            className="p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="movies grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
        {filteredMovies.map((film) => (
          <div
            key={film.id}
            className="bg-white shadow-md rounded-lg overflow-hidden"
          >
            <img
              src={imageBaseUrl + film.poster_path}
              alt={film.title}
              className="w-full h-64 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold mb-2">{film.title}</h3>
              <p className="text-gray-500 text-sm mb-2">
                Release Date: {film.release_date}
              </p>
              <p className="text-gray-700 text-sm line-clamp-3">
                {film.overview}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Movieroom;
