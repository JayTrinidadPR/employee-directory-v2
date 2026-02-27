import exoress from 'express';
import employees from "#db/employees";

const router = express.Router();

router.get("/", (req, res) => {
  res.send(employees);
});

router.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

router.get("/", (req, res) => {
    const employeeId = Number(req.params.id);
    const employee = employees.find((e) => e.id === employeeId);
    
        if (!employee) {
        return res.status(404).send("Employee not found");
        }
        res.send(employee);
});

router.post("/", (req, res) => {
    const name = req.body?.name;

    if (typeof name !== "string" || name.trim() === "") {
        return res.status(400).send("Name is required");
    }
    const nextId = 
    employees.reduce((maxId, employee) => Math.max(maxId, employee.id), 0) + 1;

    const newEmployee = { id: nextId, name: name.trim() };
    employees.push(newEmployee);

    res.status(201).send(newEmployee);
});
export default router;
