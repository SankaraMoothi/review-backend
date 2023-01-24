import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const authHeader = req.headers.token;
  if (authHeader) {
    const token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.JWT, (err, user) => {
      if (err) {
        res.status(401).json("Token Not Valid!");
      } else {
        req.user = user;
        next();
      }
    });
  } else {
    return res.status(401).json("Your Not Authenticated");
  }
};
