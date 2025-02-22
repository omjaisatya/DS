import app from "./server";
import { connectToDatabase } from "./db/connection";
import { PORT } from "./config/envConfig";

const port = PORT || 5000;

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on Port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error to connecting Database", err);
  });
