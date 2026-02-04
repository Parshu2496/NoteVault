const mongoose = require("mongoose");

const connectToMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Atlas Connected");
  } catch (error) {
    console.error("Mongo error:", error.message);
    process.exit(1);
  }
};

module.exports = connectToMongo;
