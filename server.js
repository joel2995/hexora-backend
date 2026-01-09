import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import { connectDB } from "./src/config/db.js";
import { startEventListeners } from "./src/services/eventListener.service.js";
import { startCronJobs } from "./src/services/cron.service.js";

const PORT = process.env.PORT || 5000;

connectDB();
startCronJobs();
startEventListeners();

app.listen(PORT, () => {
  console.log(`HEXORA backend running on port ${PORT}`);
});
