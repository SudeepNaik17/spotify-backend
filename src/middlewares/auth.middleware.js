const jwt = require("jsonwebtoken");

const authArtist = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role != "artist") {
      return res.status(403).json({
        message: "You cannot create the music!",
      });
    }
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
};
const authUser = async (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (decoded.role != "user") {
      return res.status(403).json({
        message: "You dont have acess!",
      });
    }
    req.user = decoded;
    next();
  } catch (e) {
    return res.status(401).json({
      message: "Unauthorized!",
    });
  }
};

module.exports = { authArtist, authUser };
