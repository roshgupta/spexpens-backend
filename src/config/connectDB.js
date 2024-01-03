import mongoose from 'mongoose';

const DB_URL = process.env.DATABASE_URL || 'mongodb://localhost:27017/spexpens';

const connectDB = async () => {
  try {
    const db = await mongoose.connect(DB_URL);
    console.log('Connected to Database successfully'.blue);
    console.log(`MongoDB Connected: ${db.connection.host}`.green.bold);
  } catch (error) {
    console.log('Error connecting with the database'.red.bold);
    console.log(`Error: ${error.message}`.red.underline);
    process.exit(1);
  }
};

const db = mongoose.connection;

db.on('error', () => {
  console.log('Error connecting to database'.red.bold);
});

db.once('open', () => {
  console.log('Connected to Database'.green.underline);
});

db.once('disconnected', () => {
  console.log('Database disconnected'.blue);
});
export default connectDB;
