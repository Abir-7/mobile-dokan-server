import app from "./app";
import { config } from "./app/config/config";

import mongoose from "mongoose";

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  console.error("There was an uncaught exception:", err);
  process.exit(1);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
  process.exit(1);
});

async function main() {
  try {
    await mongoose.connect(config.mongoDb_Uri as string);
    console.log("Connected to MongoDB successfully!");

    app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (err) {
    console.error("Error occurred while connecting to MongoDB:", err);
    process.exit(1);
  }
}

main();
