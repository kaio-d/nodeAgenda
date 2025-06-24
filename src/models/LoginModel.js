const mongoose = require("mongoose");
const validator = require("validator");
const bcryptjs = require("bcryptjs");

const LoginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
});

const LoginModel = mongoose.model("Login", LoginSchema);

class Login {
  constructor(body) {
    this.body = body;
    this.erros = [];
    this.user = null;
  }

  async logar() {
    this.validaLogin();

    if (this.erros.length > 0) {
      return;
    }

    this.user = await LoginModel.findOne({ email: this.body.email });

    if (!this.user) {
      this.erros.push("Usuário ou senha inválidos!");
      return;
    }

    if (!bcryptjs.compareSync(this.body.password, this.user.password)) {
      this.erros.push('Usuário ou senha inválidos!')
      this.user = null;
      return;
    }
  }

    validaLogin() {
    this.cleanUpLogin();

    if (!validator.isEmail(this.body.email)) {
      this.erros.push("E-mail inválido");
    }

    if (this.body.password.length < 3 || this.body.password.length >= 20) {
      this.erros.push("A senha precisa ter entre 3 e 20 caracteres");
    }
  }

    cleanUpLogin(){
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      email: this.body.email,
      password: this.body.password,
    };
  }

  async register() {
    this.validaCadastro();

    if (this.erros.length > 0) {
      return;
    }

    await this.userExists();

    if (this.erros.length > 0) {
      return;
    }

    const salt = bcryptjs.genSaltSync();
    this.body.password = bcryptjs.hashSync(this.body.password, salt);
    this.user = await LoginModel.create(this.body);
  }

  validaCadastro() {
    this.cleanUp();

    if (!validator.isEmail(this.body.email)) {
      this.erros.push("E-mail inválido");
    }

    if (this.body.password.length < 3 || this.body.password.length >= 20) {
      this.erros.push("A senha precisa ter entre 3 e 20 caracteres");
    }

    if (this.body.name.length < 3 || this.body.name.length >= 50) {
      this.erros.push("O nome precisa ter entre 3 e 50 caracteres");
    }
  }

  cleanUp() {
    for (const key in this.body) {
      if (typeof this.body[key] !== "string") {
        this.body[key] = "";
      }
    }

    this.body = {
      name: this.body.name,
      email: this.body.email,
      password: this.body.password,
    };
  }

  async userExists() {
    this.user = await LoginModel.findOne({ email: this.body.email });
    if (this.user) {
      this.erros.push("Usuário já existe!");
    }
  }
}

module.exports = Login;
