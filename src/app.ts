import express from 'express';
import connectDB from './config/db.config';
import movieRoutes from './routes/movies.routes';

const app = express();

connectDB();

app.use(express.json());

app.use('/api', movieRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
