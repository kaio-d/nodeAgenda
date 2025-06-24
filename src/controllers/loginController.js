exports.index = (req, res) => {
  res.render('login');
};

exports.login = async (req, res) => {
  res.send('Rota POST /login funcionando!');
};
