const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  res.render("register");
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if (login.erros.length > 0) {
      req.flash("erros", login.erros);
      req.session.save(function () {
        return res.redirect("/register");
      });
      return;
    }

    req.flash("success", "Usuário criado com sucesso!");
    req.session.save(function () {
      return res.redirect("/register");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
