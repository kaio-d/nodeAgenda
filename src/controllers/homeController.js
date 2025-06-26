const Contato = require("../models/ContatoModel");

exports.index = async (req, res) => {
  const contatos = await Contato.findContato();
  res.render("index", { contatos });
};
