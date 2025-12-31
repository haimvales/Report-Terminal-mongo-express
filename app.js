import express from "express";
import reportsRoutes from "./router/reportsR.js";

const app = express();
const port = 3010;
app.use(express.json());

// posts reports
app.use("/reports", reportsRoutes);

app.listen(port, () => {
    console.log(`server runing on http://localhost:${port}`);
})