const loginController = (req, res, next) => {
  try {
    res.locals.userId = req.body.userId;
    req.session.loggedIn = true;
    req.session.userId = res.locals.userId;
    res.status(200).send(req.session.userId);
  } catch (err) {
    console.log(err.message);
    res.status(500).send(err.message);
  }
};

exports.loginController = loginController;