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

exports.edit = async (req, res) => {
  try {
    if (!req.params.id) {
      return res.render("404");
    }

    const contato = new Contato(req.body);
    await contato.edit(req.params.id);

    if (contato.erros.length > 0) {
      req.flash("erros", contato.erros);
      req.session.save(() => res.redirect("/contato"));
      return;
    }

    req.flash("success", "Contato editado com sucesso!");
    req.session.save(() => res.redirect(`/contato/${contato.contato.id}`));
  } catch (e) {
    console.log(e);
    res.render("404");
  }
};

exports.delete = async (req, res) => {
  if (!req.params.id) {
    return res.render("404");
  }

  const contato = await Contato.delete(req.params.id);

  if (!contato) {
    return res.render("404");
  }

  req.flash("success", "Contato apagado com sucesso!");
  req.session.save(() => res.redirect(`/`));
};
