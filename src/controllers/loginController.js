const Login = require("../models/LoginModel");

exports.index = (req, res) => {
  res.render("login");
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.logar();
    
    if (login.erros.length > 0) {
      req.flash("erros", login.erros);
      req.session.save(function () {
        return res.redirect("/login");
      });
      return;
    }

    req.flash("success", "Usuário logado com sucesso!");
    req.session.user = login.user;
    req.session.save(function () {
      return res.redirect("/login");
    });
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};
