import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export const config = {
  port: process.env.PORT,
  jwt_secrete: process.env.JWT_SECRETE,
  jwt_expaire: process.env.JWT_EXPAIRE,
  mongoDb_Uri: process.env.MONGODB_URI,
};
