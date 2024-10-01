import { UnauthorizedError } from "../errors/index.js";

const checkPermissions = (requestUser, ressourceUserId) => {
  if (requestUser.id !== ressourceUserId.toString()) {
    throw new UnauthorizedError("Accès à cette route non autorisé");
  }
};

export { checkPermissions };
