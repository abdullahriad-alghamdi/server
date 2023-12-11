// Initialize express
import express from "express";
import morgan from "morgan";

/*======= Internal Modules or Files =======*/
// Configuration
import { dev } from "../src/config/index.js";
import { connectDB } from "../src/config/db.js";
import Food from "../src/models/food.js";

const app = express();
const port = dev.app.port;

app.listen(port, () => {
  console.log(`Server listening on port http://localhost:${port}`);
  connectDB();
});

app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Default route
app.get("/", (req, res) => {
  res.send(
    "Welcome to our Food API. You can go to /food to see all the food we have or /food/:name to see a specific food"
  );
});

// Get all food
app.get("/foods", async (req, res) => {
  try {
    const foods = await Food.find();
    if (!foods) return res.status(400).json({ msg: "No food exist" });
    res.status(200).json({ foods });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Get a specific food
app.get("/food/:name", async (req, res) => {
  try {
    const food = await Food.find({ name: req.params.name });
    if (!food) return res.status(400).json({ msg: "Food not found" });
    res.status(200).json({ food });
  } catch (error) {
    res.status(500).json({ msg: "Internal server error" });
  }
});

// Add a food link : http://localhost:5000/food
app.post("/food", async (req, res) => {
  try {
    const { name, type, price } = req.body;
    // Validation
    if (!name || !type || !price) throw Error("Please enter all fields");
    // Check for existing food
    const isFoodExist = await Food.findOne({ name });
    if (isFoodExist) return res.status(400).json({ msg: "Food already exist" });

    const newFood = new Food({
      name,
      type,
      price,
    });
    await newFood.save();
    res.status(200).json({ newFood });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
});

// Error handling
app.use((req, res, next) => {
  try {
    const error = new Error("Route not found");
    res.status(404);
    return next(error);
  } catch (error) {
    return next(error);
  }
});

export default app;