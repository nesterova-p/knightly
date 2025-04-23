import mongoose from 'mongoose';

async function connectToDB() {
  const { MONGO_URL } = process.env;
  if (!MONGO_URL) {
    throw new Error('Missing MONGO_URL environment variable');
  }

  if (mongoose.connection.readyState === 0) {
    try {
      await mongoose.connect(MONGO_URL);
      console.log('MongoDB connected…');
    } catch (err) {
      console.error('Mongo connection error:', err);
      throw err;
    }
  }
}

export default connectToDB;
