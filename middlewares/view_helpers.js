function viewHelpers(req, res, next) {
  res.locals.isLoggedIn = () => {
    if (req.session.userId) {
      return true;
    } else {
      return false;
    }
  };

  next();
}

module.exports = viewHelpers;
