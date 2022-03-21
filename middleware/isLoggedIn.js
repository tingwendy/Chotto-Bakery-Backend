module.exports = (req, res, next) => {
    if (!req.user) {
      return res.json({ 
          message: "User is not logged in" });
    }
 console.log("reqUser:", req.user)
    next();
  };