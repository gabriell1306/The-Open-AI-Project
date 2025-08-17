// import app from "./app.js";
// import { connectToDatabase } from "./db/connection.js";

// const PORT = process.env.PORT || 5000;

// // CONNECTION AND LISTSENERS
// connectToDatabase()
//   .then(() => {
//     app.listen(PORT, () =>
//       console.log("SERVER IS RUNNING AND CONNECTED TO DATABASE")
//     );
//   })
//   .catch((err) => {
//     console.log(err);
//   });

// src/index.ts
import app from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 SERVER RUNNING on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database connection failed:", err);
  });
