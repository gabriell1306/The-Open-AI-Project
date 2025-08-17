import { app } from "./app.js";
import { connectToDatabase } from "./db/connection.js";

const PORT = process.env.PORT || 5000;

// CONNECTION AND LISTSENERS
connectToDatabase()
  .then(() => {
    app.listen(PORT, () =>
      console.log("SERVER IS RUNNING AND CONNECTED TO DATABASE")
    );
  })
  .catch((err) => {
    console.log(err);
  });
