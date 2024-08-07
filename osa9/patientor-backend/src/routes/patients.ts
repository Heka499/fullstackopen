import express from "express";
import patientService from "../services/patientsService";

const router = express.Router();

router.get("/", (_req, res) => {
  res.send(patientService.getNonSensitivePatients());
});

router.post("/", (req, res) => {
  console.log(req.body);
  const newPatient = patientService.addPatient(req.body);
  res.json(newPatient);
});

export default router;
