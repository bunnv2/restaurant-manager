const jwt = require("jsonwebtoken");

export function publicLogged(req : any, res : any, next : any) {
    const token = req.cookies.token;
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (err) {
      next();
    }
  }
