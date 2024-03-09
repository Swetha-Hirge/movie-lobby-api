import express, { Request, Response } from 'express';
import Movie from '../models/movie.model';

const router = express.Router();

router.get('/movies', async (req: Request, res: Response) => {
  try {
    const movies = await Movie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.get('/search', async (req: Request, res: Response) => {
  const query = req.query.q;
  try {
    const movies = await Movie.find({
      $or: [{ title: { $regex: query, $options: 'i' } }, { genre: { $regex: query, $options: 'i' } }],
    });
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: 'Server Error' });
  }
});

router.post('/movies', async (req: Request, res: Response) => {
    const { title, genre, rating, streamingLink } = req.body;
    try {
        const existingMovie = await Movie.findOne({ title: title });
        if (existingMovie) {
            throw new Error('Movie with the same title already exists');
        }else{
        const newMovie = new Movie({ title, genre, rating, streamingLink });
        await newMovie.save();
        res.status(201).json(newMovie);
        }
    } catch (error: any) {
        console.error('Error saving movie:', error.message);
        res.status(500).json({ message: 'Failed to save movie', error: error.message });
    }
});

router.put('/movies/:id', async (req: Request, res: Response) => {
  const { title, genre, rating, streamingLink } = req.body;
  const id = req.params.id;
  try {
    const existingMovie = await Movie.findOne({ title: title });
    if (existingMovie) {
        throw new Error('Movie with the same title already exists');
    }else{
    const updatedMovie = await Movie.findByIdAndUpdate(id, { title, genre, rating, streamingLink }, { new: true });
    res.json(updatedMovie);
    }
  } catch (error: any) {
    res.status(500).json({ message: 'Failed to update movie', error: error.message });
  }
});

router.delete('/movie/:id', async (req: Request, res: Response) => {
    const id = req.params.id;
    try {
        const existingMovie = await Movie.findOne({ _id: id });
        if (!existingMovie) {
            return res.status(404).json({ message: 'Movie not found' });
        }
        await Movie.findByIdAndDelete({ _id: id });
        return  res.status(200).json({ message: 'Movie deleted successfully' });
    } catch (error: any) {
        res.status(500).json({ message: 'Failed to delete movie', error: error.message });
    }
});

export default router;
