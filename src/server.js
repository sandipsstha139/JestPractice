import app from "./app.js";
import config from "./config/config.js";
import connectDB from "./config/database.config.js";

connectDB();

app.listen(config.PORT, () => {
  console.log(`Server is running on port ${config.PORT}`);
});
