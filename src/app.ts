import express from "express";
import cors from "cors";
import errorHandler from "./app/middleware/globalErrorHandler";
import notFoundHandler from "./app/middleware/notFoundHandler";
import router from "./app/routes";

const app = express();
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your client's origin
    credentials: true, // Allow credentials (cookies, etc.)
  })
);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Wellcome to Mobile-Dokan");
});
app.use("/api/v1", router);

app.use(notFoundHandler);
app.use(errorHandler);
export default app;
