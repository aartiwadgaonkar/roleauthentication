const jwt = require("jsonwebtoken");

exports.authMiddleware = (req, res, next) => {
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MWZkZmVmNjUyOTg2NWQ5MTFlMTBjOCIsImlhdCI6MTczMDE3MzUzOH0.J8_UJf-7-2-gyYLXX0Lkc2D_TtdhBB9tb4MGgsmntfw";
  const token = req.headers.authorization;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "please provide token",
    });
  }
  // console.log(token,"tk");
  
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token.");
    req.user = user;
    next();
  });
  // req.body.id = id
};




exports.verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(403).send("A token is required for authentication");

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) return res.status(401).send("Invalid Token");
        req.user = decoded;
        next();
    });
};

exports.checkRole = (roles) => (req, res, next) => {
    if (!req.user || !roles.includes(req.user.roles)) {
        return res.status(403).send("Access denied");
    }
    next();
};
