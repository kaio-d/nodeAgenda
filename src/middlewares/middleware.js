exports.middlewareGlobal = (req, res, next) => {
  res.locals.erros = req.flash('erros');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
};

exports.checkCrsfError = (err, req, res, next) => {
  if (err) {
    return res.render("404");
  }

  next();
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

exports.loguinRequired = (req, res, next) => {
  if(!req.session.user) {
    req.flash("erros", "Você precisa fazer Login");
    req.session.save(() => {
      res.redirect("/login");
      return;
    });
  }

  next();
}