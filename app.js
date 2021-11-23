const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./db/db");


const PORT = process.env.PORT || 5000

// database connection
connectDB()

const usersRouter = require("./routes/users");
const companiesRouter = require("./routes/companies");
const departmentsRouter = require("./routes/departments");
const designationsRouter = require("./routes/designations");

app.use(cors());
app.use(express.json())

// All Routes 
app.use("/api/users", usersRouter);
app.use("/api/designations", designationsRouter);
app.use("/api/departments", departmentsRouter);
app.use("/api/companies", companiesRouter);




app.listen(PORT, () => console.log(`server is listening on port ${PORT}`))