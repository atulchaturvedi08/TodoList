const mongoose = require('mongoose');

const connectDB  = async () => {
  try {
    const dbUri = process.env.MONGO_URI;  // Ensure this is a string
    if (!dbUri) {
      console.error('MongoDB URI not defined!');
      process.exit(1);
    }
    await mongoose.connect(dbUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error(error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
