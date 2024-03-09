"use strict";
// src/routes/movies.routes.ts
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movie_model_1 = __importDefault(require("../models/movie.model"));
const router = express_1.default.Router();
// List all movies
router.get('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const movies = yield movie_model_1.default.find();
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}));
// Search movies by title or genre
router.get('/search', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.q;
    try {
        const movies = yield movie_model_1.default.find({
            $or: [{ title: { $regex: query, $options: 'i' } }, { genre: { $regex: query, $options: 'i' } }],
        });
        res.json(movies);
    }
    catch (error) {
        res.status(500).json({ message: 'Server Error' });
    }
}));
// Add a new movie
router.post('/movies', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, genre, rating, streamingLink } = req.body;
    try {
        // Check if a movie with the same title already exists
        const existingMovie = yield movie_model_1.default.findOne({ title: title });
        if (existingMovie) {
            throw new Error('Movie with the same title already exists');
        }
        else {
            // If no existing movie found, create and save the new movie
            const newMovie = new movie_model_1.default({ title, genre, rating, streamingLink });
            yield newMovie.save();
            res.status(201).json(newMovie);
        }
    }
    catch (error) {
        // Handle the error
        console.error('Error saving movie:', error.message);
        res.status(500).json({ message: 'Failed to save movie', error: error.message });
    }
}));
// Update a movie by id
router.put('/movies/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, genre, rating, streamingLink } = req.body;
    const id = req.params.id;
    try {
        const existingMovie = yield movie_model_1.default.findOne({ title: title });
        if (existingMovie) {
            throw new Error('Movie with the same title already exists');
        }
        else {
            const updatedMovie = yield movie_model_1.default.findByIdAndUpdate(id, { title, genre, rating, streamingLink }, { new: true });
            res.json(updatedMovie);
        }
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to update movie', error: error.message });
    }
}));
// Delete a movie by id
router.delete('/movie/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const existingMovie = yield movie_model_1.default.findOne({ _id: id });
        if (!existingMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        yield movie_model_1.default.findByIdAndDelete({ _id: id });
        return res.status(200).json({ message: 'Movie deleted successfully' });
    }
    catch (error) {
        res.status(500).json({ message: 'Failed to delete movie', error: error.message });
    }
}));
exports.default = router;
