import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    let token;
    const authorization = req.headers.authorization || req.headers["x-access-token"];

    if (!authorization) {
      return res.status(400).json({ message: "No token provided" });
    }
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies.token) {
      token = req.cookies.token;
    }
    const isCustomAuth = token.length < 500;
    let decodedData;
    try {
      if (token && isCustomAuth) {
        decodedData = jwt.verify(token, process.env.JWT_TOKEN_SECRET);
        req.userId = decodedData?.id;
      } else {
        decodedData = jwt.decode(token);
        req.userId = decodedData?.sub;
      }
    } catch (error) {
      res.status(401);
      return res.status(400).json({ message: "Invalid token" });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;
