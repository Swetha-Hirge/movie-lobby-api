import { Schema, model, Document } from 'mongoose';

export interface MovieDocument extends Document {
    title: string;
    genre: string;
    rating: number;
    streamingLink: string;
}

const movieSchema = new Schema({
    title: { type: String, required: true, unique: true },
    genre: { type: String, required: true },
    rating: { type: Number, required: true },
    streamingLink: { type: String, required: true },
});

export default model<MovieDocument>('Movie', movieSchema);
