import mongoose, { ConnectOptions } from "mongoose";

const options: ConnectOptions & {
  useNewUrlParser: boolean;
  useUnifiedTopology: boolean;
} = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

const connectToMongoDB = (dbURL: string) => {
  return mongoose
    .connect(dbURL, options)
    .then(() => console.log("Connected to MongoDB"))
    .catch((error) => console.error("Error connecting to MongoDB:", error));
};

export default connectToMongoDB;
