import mongoose, { ConnectOptions } from "mongoose";
const MONGO_URI = process.env.mongo_uri || "mongodb://localhost:27017/tech_hub";

interface Mongoose {
    connect: () => Promise<void>;
}

export const mongodb: Mongoose = {
    connect: async() => {
        try {
            await mongoose.connect(MONGO_URI, {} as ConnectOptions);
            mongoose.set('debug', true);
            console.log('Connected to MongoDB Atlas');
          } catch (error) {
            console.error('Error: ', error);
            throw new Error('Failed to connect to MongoDB Atlas',);
          }
    }
}