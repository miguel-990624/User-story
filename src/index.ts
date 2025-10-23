import express  from "express";
import { initSequelize } from "./config/database.ts";
import "./models/index.models.ts";

const app = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

(async () => {
  await initSequelize();
  
  app.listen(PORT, () => {
    console.log(`✅ Server running on port: ${PORT}`);
  });
})();