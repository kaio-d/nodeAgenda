const Contato = require("../models/ContatoModel");

exports.index = (req, res) => {
  res.render("cadastro", {
    contato: {},
  });
};

exports.register = async (req, res) => {
  try {
    const contato = new Contato(req.body);
    await contato.register();

    if (contato.erros.length > 0) {
      req.flash("erros", contato.erros);
      req.session.save(() => res.redirect("/contato"));
      return;
    }

    req.flash("success", "Usuário cadastrado");
    req.session.save(() => res.redirect(`/contato/${contato.contato.id}`));
  } catch (e) {
    console.log(e);
    return res.render("404");
  }
};

exports.editIndex = async (req, res) => {
  if (!req.params.id) {
    return res.render("404");
  }

  const contato = await Contato.findId(req.params.id);

  if (!contato) {
    return res.render("404");
  }

  res.render("cadastro", {
    contato,
  });
};
