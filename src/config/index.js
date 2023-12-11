/*======= External Dependencies and Modules =======*/
// Configurations
import "dotenv/config";

export const dev = {
  app: {
    port: Number(process.env.PORT) || 3000,
  },
  db: {
    url: process.env.MONGO_URL || "mongodb://localhost:27017/food",
  },
};
