export function isAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    res
      .status(401)
      .send(
        '<p>You are not authorized, please <a href="/register">register</a> or <a href="/login">login</a>'
      );
  }
}

export function isAdmin(req, res, next) {}
