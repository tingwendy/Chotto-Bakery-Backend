module.exports = (req, res, next) => { 
    if (req.session.user) {
      return res.json({
          message: "You are logged out. Please log in to continue",
        });
    }
    next();
  };