import express from "express";
import cors from "cors";
import errorHandler from "./app/middleware/globalErrorHandler";
import notFoundHandler from "./app/middleware/notFoundHandler";
import router from "./app/routes";

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Wellcome to Mobile-Dokan");
});
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
