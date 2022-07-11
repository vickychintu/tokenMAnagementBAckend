const jwt = require("jsonwebtoken");
require("dotenv").config();

/*
This function used to token verification
   for jwt tokens verification 
   jwt genration
   every user request must be authenticated here
   catch all possible error codes
*/

const verifyToken = (req, res, next) => {
  const authHeaderToken = req.headers.authorization;
  if (authHeaderToken) {
    const token = authHeaderToken.split(" ")[1];
    jwt.verify(token, process.env.JWT_KEY, (err, user) => {
      if (err) {
        res.status(403).json({ message: "token expired" });
        return;
      }
      req.user = user;
      next();
    });
  } else {
    return res.status(401).json({ message: "You are not authenticated" });
  }
};

const generateToken = (userId) => {
  const token = jwt.sign(
    {
      id: userId,
    },
    process.env.JWT_KEY,
    { expiresIn: "3d" }
  );
  return token;
};

module.exports = { verifyToken, generateToken };
