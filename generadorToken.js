import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

const payload = {
  id: 123,
  email: "test@demo.com",
  rol: "tester"
};

const token = jwt.sign(payload, process.env.JWT_SECRET, {
  expiresIn: "2h"
});

console.log("\nTOKEN JWT PARA PROBAR:\n");
console.log(token);