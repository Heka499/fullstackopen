import express from "express";
const app = express();
import calculateBmi from "./bmiCalculator";
import { calculateExercises, ExerciseValues } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);

  if (isNaN(height) || isNaN(weight)) {
    res.json({ error: "malformatted parameters" });
    return;
  }

  const bmi = calculateBmi(height, weight);
  res.json({ weight, height, bmi });
});

app.post("/exercises", (req, res) => {
  const { daily_exercises, target } = req.body;

  if (!daily_exercises || !target) {
    res.json({ error: "parameters missing" });
    return;
  }

  if (!Array.isArray(daily_exercises) || isNaN(Number(target))) {
    res.json({ error: "malformatted parameters" });
    return;
  }

  const exerciseValues: ExerciseValues = {
    hours: daily_exercises.map((h: number) => Number(h)),
    target: Number(target),
  };

  return res.json(
    calculateExercises(exerciseValues.hours, exerciseValues.target)
  );
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
