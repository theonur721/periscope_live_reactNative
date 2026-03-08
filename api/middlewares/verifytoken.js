import jwt from "jsonwebtoken";
import error from "../utils/error.js";

const verifytoken = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return next(error(401, "Authorization token yok"));
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.JWT_KEY, (err, decoded) => {
    if (err) return next(error(403, "Token geçersiz"));

    req.user = decoded; // { id, name, iat, exp }
    next();
  });
};

export default verifytoken;
