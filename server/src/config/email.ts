import axios from "axios";
import * as dotenv from "dotenv";

dotenv.config();

const brevo = axios.create({
  baseURL: "https://api.brevo.com/v3",
  headers: {
    "api-key": process.env.BREVO_API_KEY as string,
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default brevo;
