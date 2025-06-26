const mongoose = require("mongoose");
const validator = require("validator");

const ContatoSchema = new mongoose.Schema({
  name: { type: String, required: true },
  sobrenome: { type: String, required: false, default: "" },
  email: { type: String, required: false, default: "" },
  cel: { type: String, required: false, default: "" },
  criadoEm: { type: Date, default: Date.now },
});

const ContatoModel = mongoose.model("Contato", ContatoSchema);

function Contato(body) {
  this.body = body;
  this.erros = [];
  this.contato = null;
}

Contato.prototype.register = async function () {
  this.valida();

  if (this.erros.length > 0) {
    return;
  }

  this.contato = await ContatoModel.create(this.body);
};

Contato.prototype.valida = function () {
  this.cleanUp();

  if (!this.body.name || this.body.name.trim() === "") {
    this.erros.push("O nome é um campo obrigatório");
  }

  if (this.body.email && !validator.isEmail(this.body.email)) {
    this.erros.push("E-mail inválido");
  }

  if (!this.body.email && !this.body.cel) {
    this.erros.push("Necessário um email ou telefone para salvar");
  }
};

Contato.prototype.cleanUp = function () {
  for (const key in this.body) {
    if (typeof this.body[key] !== "string") {
      this.body[key] = "";
    }
  }

  this.body = {
    name: this.body.name,
    sobrenome: this.body.sobrenome,
    email: this.body.email,
    cel: this.body.cel,
  };
};

Contato.prototype.edit = async function (id) {
  if (typeof id !== "string") {
    return;
  }
  this.valida();
  if (this.erros.length > 0) {
    return;
  }

  this.contato = await ContatoModel.findByIdAndUpdate(id, this.body, {
    new: true,
  });
};

// Métodos Estáticos
Contato.findId = async function (id) {
  if (typeof id !== "string") {
    return;
  }

  const user = await ContatoModel.findById(id);
  return user;
};

Contato.findContato = async function () {
  const contatos = await ContatoModel.find().sort({ criadoEm: -1 });
  return contatos;
};

Contato.delete = async function (id) {
  if (typeof id !== "string") {
    return;
  }

  const contato = await ContatoModel.findOneAndDelete({_id:id});
  return contato;
};

module.exports = Contato;
