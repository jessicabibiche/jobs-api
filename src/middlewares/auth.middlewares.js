import { UnauthenticatedError } from "../errors/index.js";
import jwt from "jsonwebtoken";

const authenticateUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthenticatedError("Pas de token fourni !");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    const { userId, username } = decodedToken;
    req.user = { id: userId, username };
    next();
  } catch (error) {
    throw new UnauthenticatedError("Accès non autorisé !");
  }
};

export default authenticateUser;
