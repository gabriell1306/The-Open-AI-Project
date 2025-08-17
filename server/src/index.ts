import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

// CONNECTION AND LISTSENERS
if (process.env.NODE_ENV !== "test") {
  connectToDatabase()
    .then(() => {
      app.listen(PORT, () =>
        console.log(`🚀 Server is running on port ${PORT}`)
      );
    })
    .catch((err) => {
      console.error("❌ Failed to connect to DB", err);
    });
}
